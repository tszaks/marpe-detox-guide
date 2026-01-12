interface ParsedContent {
  description?: string;
  ingredients: string[];
  instructions: string[];
  servingSuggestions?: string[];
}

/**
 * Parse recipe content from Notion page body markdown
 *
 * Expected formats vary - recipes may have:
 * - **Ingredients** header or just a list
 * - **Instructions** or **Directions** header
 * - **Serving Suggestions** section (optional)
 * - Numbered or bulleted instructions
 */
export function parseRecipeContent(content: string): ParsedContent {
  const lines = content.split('\n').filter((line) => line.trim());

  let currentSection: 'description' | 'ingredients' | 'instructions' | 'serving' =
    'description';
  const result: ParsedContent = {
    description: '',
    ingredients: [],
    instructions: [],
    servingSuggestions: [],
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const lowerTrimmed = trimmed.toLowerCase();

    // Detect section headers (with or without markdown bold)
    if (
      lowerTrimmed.match(/^\*{0,2}ingredients\*{0,2}:?$/) ||
      lowerTrimmed === '## ingredients' ||
      lowerTrimmed === '### ingredients'
    ) {
      currentSection = 'ingredients';
      continue;
    }
    if (
      lowerTrimmed.match(/^\*{0,2}(instructions|directions)\*{0,2}:?$/) ||
      lowerTrimmed === '## instructions' ||
      lowerTrimmed === '### instructions' ||
      lowerTrimmed === '## directions' ||
      lowerTrimmed === '### directions'
    ) {
      currentSection = 'instructions';
      continue;
    }
    if (
      lowerTrimmed.match(/^\*{0,2}serving suggestions?\*{0,2}:?$/) ||
      lowerTrimmed === '## serving suggestions'
    ) {
      currentSection = 'serving';
      continue;
    }

    // Skip empty lines and header-only lines
    if (!trimmed || trimmed.match(/^#{1,3}\s*$/)) {
      continue;
    }

    // Parse content based on current section
    switch (currentSection) {
      case 'description':
        // Only add to description if it's not a list item
        if (!trimmed.startsWith('-') && !trimmed.match(/^\d+\./)) {
          // Skip if it looks like a section header we missed
          if (!trimmed.match(/^(ingredients|instructions|directions)/i)) {
            result.description += (result.description ? ' ' : '') + trimmed;
          }
        }
        break;

      case 'ingredients':
        if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('•')) {
          const item = trimmed.replace(/^[-*•]\s*/, '').trim();
          if (item) result.ingredients.push(item);
        } else if (!trimmed.match(/^(instructions|directions)/i)) {
          // Some recipes have ingredients without bullet points
          const item = trimmed.replace(/^\d+\.\s*/, '').trim();
          if (item && !item.match(/^(instructions|directions)/i)) {
            result.ingredients.push(item);
          }
        }
        break;

      case 'instructions':
        if (trimmed.match(/^\d+\./) || trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const step = trimmed
            .replace(/^\d+\.\s*/, '')
            .replace(/^[-*]\s*/, '')
            .trim();
          if (step) result.instructions.push(step);
        } else {
          // Prose-style instructions (paragraph format)
          result.instructions.push(trimmed);
        }
        break;

      case 'serving':
        if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('•')) {
          const suggestion = trimmed.replace(/^[-*•]\s*/, '').trim();
          if (suggestion) result.servingSuggestions?.push(suggestion);
        } else {
          result.servingSuggestions?.push(trimmed);
        }
        break;
    }
  }

  // Clean up description - remove any accidental ingredient/instruction leakage
  if (result.description) {
    result.description = result.description
      .replace(/\s+/g, ' ')
      .trim();
  }

  return result;
}
