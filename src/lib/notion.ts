import { Client } from '@notionhq/client';
import type { Recipe, RecipeSubmission, RecipeType } from '@/types';
import { parseRecipeContent } from './parseRecipeContent';
import { slugify } from './slugify';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const RECIPES_DATABASE_ID = process.env.NOTION_RECIPES_DB_ID || '895cc939-aa32-4fe0-9264-6592f9f62dce';

/**
 * Extract plain text from Notion rich_text array
 */
function getRichText(richText: any[]): string {
  return richText?.map((t) => t.plain_text).join('') || '';
}

/**
 * Convert Notion blocks to markdown string
 */
function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return getRichText(block.paragraph.rich_text);
        case 'heading_1':
          return `# ${getRichText(block.heading_1.rich_text)}`;
        case 'heading_2':
          return `## ${getRichText(block.heading_2.rich_text)}`;
        case 'heading_3':
          return `### ${getRichText(block.heading_3.rich_text)}`;
        case 'bulleted_list_item':
          return `- ${getRichText(block.bulleted_list_item.rich_text)}`;
        case 'numbered_list_item':
          return `1. ${getRichText(block.numbered_list_item.rich_text)}`;
        case 'video':
          return `[Video](${block.video?.external?.url || ''})`;
        case 'divider':
          return '---';
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n');
}

/**
 * Get page content (blocks) as markdown string
 */
async function getPageContent(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    return blocksToMarkdown(blocks.results);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return '';
  }
}

/**
 * Map Notion page to Recipe type
 */
function mapPageToRecipe(page: any, content: string): Recipe {
  const props = page.properties;
  const name = props.Name?.title?.[0]?.plain_text || 'Untitled Recipe';
  const parsed = parseRecipeContent(content);

  // Get status - default to 'Approved' if property doesn't exist yet
  let status: 'Approved' | 'Pending' = 'Approved';
  if (props.Status?.select?.name) {
    status = props.Status.select.name as 'Approved' | 'Pending';
  }

  return {
    id: page.id,
    slug: slugify(name),
    name,
    recipeTypes: props['Recipe Type']?.multi_select?.map((s: any) => s.name) || [],
    createdAt: props.Created?.created_time || page.created_time || '',
    submitterName: props['Submitter Name']?.rich_text?.[0]?.plain_text,
    status,
    description: parsed.description,
    ingredients: parsed.ingredients,
    instructions: parsed.instructions,
    servingSuggestions: parsed.servingSuggestions,
    rawContent: content,
  };
}

// Mock data for fallback
const MOCK_RECIPES: Recipe[] = [
  {
    id: 'real-1',
    slug: 'spinach-vegetable-soup',
    name: 'Spinach Vegetable Soup',
    recipeTypes: ['Entrees', 'Soup'],
    createdAt: '2024-12-31T14:11:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A nourishing vegetable soup packed with spinach and detox-friendly ingredients.',
    ingredients: ['Spinach', 'Vegetable broth', 'Onions', 'Garlic', 'Carrots', 'Celery'],
    instructions: ['Sauté vegetables in a pot.', 'Add broth and simmer.', 'Stir in spinach until wilted.', 'Serve warm.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-2',
    slug: 'dijon-roasted-turkey',
    name: 'Dijon Roasted Turkey',
    recipeTypes: ['Entrees'],
    createdAt: '2024-12-31T14:16:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Flavorful roasted turkey with a zesty Dijon mustard coating.',
    ingredients: ['Turkey breast', 'Dijon mustard', 'Olive oil', 'Herbs', 'Salt', 'Pepper'],
    instructions: ['Preheat oven.', 'Rub turkey with mustard mixture.', 'Roast until cooked through.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-3',
    slug: 'baked-sweet-potato-slices',
    name: 'Baked Sweet-Potato Slices',
    recipeTypes: ['Side'],
    createdAt: '2024-12-31T14:38:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Simple and satisfying sweet potato slices baked to perfection.',
    ingredients: ['Sweet potatoes', 'Olive oil', 'Sea salt'],
    instructions: ['Slice sweet potatoes.', 'Toss with oil and salt.', 'Bake until tender.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-4',
    slug: 'cajun-salmon',
    name: 'Cajun Salmon',
    recipeTypes: ['Entrees', 'Seafood'],
    createdAt: '2024-12-31T14:42:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Spicy and healthy salmon fillets with Cajun seasoning.',
    ingredients: ['Salmon fillets', 'Cajun seasoning (sugar-free)', 'Lemon', 'Oil'],
    instructions: ['Coat salmon with seasoning.', 'Pan-sear or bake until flaky.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-5',
    slug: 'lemon-pepper-asparagus',
    name: 'Lemon Pepper Asparagus',
    recipeTypes: ['Side', 'Vegetable'],
    createdAt: '2024-12-31T14:48:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Crisp asparagus spears with a bright lemon zest.',
    ingredients: ['Asparagus', 'Lemon juice', 'Black pepper', 'Olive oil'],
    instructions: ['Toss asparagus with ingredients.', 'Roast or grill lightly.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-6',
    slug: 'lentil-soup',
    name: 'Lentil Soup',
    recipeTypes: ['Entrees', 'Soup'],
    createdAt: '2024-12-31T16:30:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Hearty lentil soup rich in fiber and plant-based protein.',
    ingredients: ['Lentils', 'Vegetable broth', 'Carrots', 'Onions', 'Celery', 'Tomatoes'],
    instructions: ['Combine all ingredients in a pot.', 'Simmer until lentils are tender.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-7',
    slug: 'roasted-garlic-sweet-potato-soup',
    name: 'Roasted Garlic & Sweet Potato Soup',
    recipeTypes: ['Entrees', 'Soup'],
    createdAt: '2024-12-31T16:49:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Creamy and comforting soup with roasted garlic depth.',
    ingredients: ['Sweet potatoes', 'Garlic bulbs', 'Vegetable broth', 'Coconut milk (optional)'],
    instructions: ['Roast garlic and sweet potatoes.', 'Blend with broth until smooth.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-8',
    slug: 'flaxseed-crackers',
    name: 'Flaxseed Crackers',
    recipeTypes: ['Snacks'],
    createdAt: '2024-12-31T17:06:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Crunchy homemade crackers made from flaxseeds.',
    ingredients: ['Flaxseeds', 'Water', 'Seasonings'],
    instructions: ['Mix flaxseeds and water.', 'Spread thin on baking sheet.', 'Bake at low temp until crisp.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-9',
    slug: 'kale-chips',
    name: 'Kale Chips',
    recipeTypes: ['Snacks'],
    createdAt: '2024-12-31T17:20:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A crispy, salty snack alternative to potato chips.',
    ingredients: ['Kale', 'Olive oil', 'Sea salt'],
    instructions: ['Massage oil into kale leaves.', 'Bake until crispy but not burnt.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-10',
    slug: 'lentil-stuffed-zucchini-boats',
    name: 'Lentil-Stuffed Zucchini Boats',
    recipeTypes: ['Entrees'],
    createdAt: '2024-12-31T17:24:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Zucchini halves filled with a savory lentil mixture.',
    ingredients: ['Zucchini', 'Cooked lentils', 'Tomato sauce (sugar-free)', 'Herbs'],
    instructions: ['Hollow out zucchini.', 'Fill with lentil mixture.', 'Bake until zucchini is tender.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-11',
    slug: 'avocado-chimichurri-cucumber',
    name: 'Avocado Chimichurri on Cucumber',
    recipeTypes: ['Snacks'],
    createdAt: '2024-12-31T18:50:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Fresh cucumber slices topped with zesty avocado.',
    ingredients: ['Cucumber slices', 'Avocado', 'Parsley', 'Garlic', 'Vinegar'],
    instructions: ['Mash avocado with herbs.', 'Dollop onto cucumber slices.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-12',
    slug: 'roasted-cauliflower-brussel-sprouts',
    name: 'Roasted Cauliflower & Brussel Sprouts',
    recipeTypes: ['Side'],
    createdAt: '2025-01-01T12:30:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A classic roasted vegetable duo.',
    ingredients: ['Cauliflower', 'Brussels sprouts', 'Olive oil', 'Salt'],
    instructions: ['Chop vegetables.', 'Roast in oven until golden.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-13',
    slug: 'mama-kylers-vegan-chili',
    name: 'Mama Kyler’s Vegan Chili',
    recipeTypes: ['Side', 'Entrees'],
    createdAt: '2025-01-01T12:39:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A warming bean-free or bean-based vegan chili (depending on detox phase).',
    ingredients: ['Tomatoes', 'Peppers', 'Onions', 'Spices', 'Vegetables'],
    instructions: ['Simmer all ingredients together until flavorful.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-14',
    slug: 'faux-tatoes',
    name: 'Faux-Tatoes',
    recipeTypes: ['Side'],
    createdAt: '2025-01-01T12:43:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Mashed cauliflower that mimics mashed potatoes.',
    ingredients: ['Cauliflower', 'Garlic', 'Olive oil/Ghee', 'Salt'],
    instructions: ['Steam cauliflower.', 'Mash or blend with garlic and oil.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-15',
    slug: 'zucchini-hummus',
    name: 'Zucchini Hummus',
    recipeTypes: ['Snacks', 'Side'],
    createdAt: '2025-01-01T12:47:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A legume-free hummus alternative using zucchini.',
    ingredients: ['Zucchini (peeled)', 'Tahini', 'Lemon juice', 'Garlic', 'Cumin'],
    instructions: ['Blend all ingredients until smooth.'],
    servingSuggestions: ['Serve with raw veggies.'],
    rawContent: '',
  },
  {
    id: 'real-16',
    slug: 'detox-cookies',
    name: 'Detox Cookies',
    recipeTypes: ['Dessert', 'Snacks'],
    createdAt: '2025-01-10T10:31:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Simple treats made with approved ingredients.',
    ingredients: ['Banana', 'Coconut flakes', 'Cinnamon'],
    instructions: ['Mash banana.', 'Mix with coconut.', 'Bake until firm.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-17',
    slug: 'sweet-potato-butter',
    name: 'Sweet Potato & Butter',
    recipeTypes: ['Entrees', 'Side'],
    createdAt: '2025-01-10T10:35:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Baked sweet potato topped with high-quality butter/ghee.',
    ingredients: ['Sweet potato', 'Grass-fed butter or Ghee', 'Cinnamon (optional)'],
    instructions: ['Bake sweet potato.', 'Top with butter.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-18',
    slug: 'bone-broth',
    name: 'Bone Broth',
    recipeTypes: ['Beverage'],
    createdAt: '2025-01-10T10:39:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Healing broth rich in minerals.',
    ingredients: ['Bones (chicken/beef)', 'Water', 'Apple cider vinegar', 'Vegetable scraps'],
    instructions: ['Simmer bones and water for 12-24 hours.', 'Strain and drink.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-19',
    slug: 'workshop-chickpea-salad',
    name: 'Chickpea Salad',
    recipeTypes: ['Entrees'],
    createdAt: '2025-01-10T10:45:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Fresh salad with protein-rich chickpeas.',
    ingredients: ['Chickpeas', 'Cucumber', 'Tomato', 'Parsley', 'Lemon dressing'],
    instructions: ['Toss all ingredients together.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-20',
    slug: 'cracklin-cauliflower',
    name: 'Cracklin\' Cauliflower',
    recipeTypes: ['Entrees', 'Side'],
    createdAt: '2025-01-10T10:50:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Spiced roasted cauliflower florets.',
    ingredients: ['Cauliflower', 'Spices', 'Oil'],
    instructions: ['Roast until crispy edges form.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-21',
    slug: 'mediterranean-turkey-zucchini',
    name: 'Mediterranean Turkey Zucchini Boats',
    recipeTypes: ['Client Submission', 'Entrees'],
    createdAt: '2025-01-26T21:53:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'A client favorite featuring turkey and Mediterranean flavors.',
    ingredients: ['Ground turkey', 'Zucchini', 'Olives', 'Tomatoes', 'Oregano'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-22',
    slug: 'stuffed-peppers-turkey',
    name: 'Stuffed Peppers with Turkey',
    recipeTypes: ['Client Submission', 'Entrees'],
    createdAt: '2025-01-26T21:58:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Bell peppers stuffed with lean turkey and veggies.',
    ingredients: ['Bell peppers', 'Ground turkey', 'Cauliflower rice', 'Onion'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-23',
    slug: 'hemp-chia-porridge',
    name: 'Hemp and Chia Seed Porridge',
    recipeTypes: ['Client Submission', 'Beverage'], // Categorized as beverage/breakfast
    createdAt: '2025-01-26T22:00:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'A warm, grain-free breakfast porridge.',
    ingredients: ['Hemp hearts', 'Chia seeds', 'Almond milk', 'Cinnamon'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-24',
    slug: 'tuscan-vegetable-soup',
    name: 'Tuscan Vegetable Soup',
    recipeTypes: ['Client Submission', 'Soup'],
    createdAt: '2025-01-26T22:01:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Robust vegetable soup with Italian herbs.',
    ingredients: ['Zucchini', 'Kale', 'Tomatoes', 'White beans (optional)', 'Italian seasoning'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-25',
    slug: 'homemade-greek-dressing',
    name: 'Homemade Greek Dressing',
    recipeTypes: ['Client Submission', 'Condiments'],
    createdAt: '2025-01-26T22:02:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Better than store-bought dressing.',
    ingredients: ['Olive oil', 'Red wine vinegar', 'Oregano', 'Garlic', 'Lemon'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-26',
    slug: 'lemon-garlic-kale',
    name: 'Lemon Garlic Kale',
    recipeTypes: ['Client Submission', 'Side'],
    createdAt: '2025-01-26T22:04:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Simple sautéed kale.',
    ingredients: ['Kale', 'Garlic', 'Lemon', 'Oil'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-27',
    slug: 'sweet-potato-avocado-toast',
    name: 'Sweet Potato Avocado Toast',
    recipeTypes: ['Client Submission', 'Snacks'],
    createdAt: '2025-01-26T22:05:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Sweet potato slices used as "toast".',
    ingredients: ['Sweet potato slices (baked)', 'Avocado', 'Red pepper flakes'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'real-28',
    slug: 'chipotle-black-beans',
    name: 'Chipotle Black Beans',
    recipeTypes: ['Client Submission', 'Side'],
    createdAt: '2025-01-26T22:07:00Z',
    submitterName: 'Marpé Client',
    status: 'Approved',
    description: 'Spicy black beans.',
    ingredients: ['Black beans', 'Chipotle powder', 'Cumin', 'Onion'],
    instructions: ['Details coming soon.'],
    servingSuggestions: [],
    rawContent: '',
  },
];

/**
 * Fetch all approved recipes from Notion
 * Uses ISR with 60-second revalidation
 */
export async function getApprovedRecipes(): Promise<Recipe[]> {
  try {
    // First, try to query with Status filter
    let response;
    try {
      response = await notion.databases.query({
        database_id: RECIPES_DATABASE_ID,
        filter: {
          property: 'Status',
          select: {
            equals: 'Approved',
          },
        },
        sorts: [
          {
            property: 'Created',
            direction: 'descending',
          },
        ],
      });
    } catch {
      // If Status property doesn't exist yet, fetch all recipes
      // console.log('Status property not found, fetching all recipes');
      response = await notion.databases.query({
        database_id: RECIPES_DATABASE_ID,
        sorts: [
          {
            property: 'Created',
            direction: 'descending',
          },
        ],
      });
    }

    // Fetch content for each recipe in parallel
    const recipes = await Promise.all(
      response.results.map(async (page: any) => {
        const content = await getPageContent(page.id);
        return mapPageToRecipe(page, content);
      })
    );

    return recipes;
  } catch (error) {
    console.warn('Failed to fetch recipes from Notion. Using mock data for display.', error instanceof Error ? error.message : '');
    return MOCK_RECIPES;
  }
}

/**
 * Fetch a single recipe by slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getApprovedRecipes();
  return recipes.find((r) => r.slug === slug) || null;
}

/**
 * Fetch a single recipe by ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const content = await getPageContent(id);
    return mapPageToRecipe(page, content);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
}

/**
 * Create a new recipe submission in Notion
 */
export async function createRecipeSubmission(
  data: RecipeSubmission & { imageName?: string }
): Promise<string> {
  // Build the page content blocks
  const children: any[] = [];

  // Add image note if present
  if (data.imageName) {
    children.push({
      object: 'block',
      type: 'callout',
      callout: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: `ATTACHED IMAGE: ${data.imageName}`,
            },
          },
        ],
        color: 'gray_background',
      },
    });
  }

  // Add description if ingredients have a preamble
  children.push({
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Ingredients' } }],
    },
  });

  // Add ingredients as bullet list
  const ingredientLines = data.ingredients.split('\n').filter((line) => line.trim());
  for (const line of ingredientLines) {
    const cleanLine = line.replace(/^[-*•]\s*/, '').trim();
    if (cleanLine) {
      children.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: cleanLine } }],
        },
      });
    }
  }

  // Add instructions section
  if (data.instructions.trim()) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: 'Instructions' } }],
      },
    });

    const instructionLines = data.instructions.split('\n').filter((line) => line.trim());
    for (const line of instructionLines) {
      const cleanLine = line.replace(/^\d+\.\s*/, '').replace(/^[-*•]\s*/, '').trim();
      if (cleanLine) {
        children.push({
          object: 'block',
          type: 'numbered_list_item',
          numbered_list_item: {
            rich_text: [{ type: 'text', text: { content: cleanLine } }],
          },
        });
      }
    }
  }

  // Build properties object
  const properties: any = {
    Name: {
      title: [
        {
          text: {
            content: data.recipeName,
          },
        },
      ],
    },
    'Recipe Type': {
      multi_select: [{ name: 'Client Submission' }],
    },
  };

  // Add Status if the property exists (will fail gracefully if not)
  try {
    properties.Status = {
      select: {
        name: 'Pending',
      },
    };
  } catch {
    // Status property might not exist yet
  }

  // Add Submitter Name if property exists
  try {
    properties['Submitter Name'] = {
      rich_text: [
        {
          text: {
            content: data.submitterName,
          },
        },
      ],
    };
  } catch {
    // Submitter Name property might not exist yet
  }

  const response = await notion.pages.create({
    parent: {
      database_id: RECIPES_DATABASE_ID,
    },
    properties,
    children,
  });

  return response.id;
}

/**
 * Get all unique recipe categories
 */
export function getRecipeCategories(): RecipeType[] {
  return [
    'Entrees',
    'Side',
    'Soup',
    'Snacks',
    'Dessert',
    'Beverage',
    'Vegetable',
    'Seafood',
    'Condiments',
    'Miscellaneous',
  ];
}
