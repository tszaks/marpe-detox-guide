# Marpe Detox Guide - January 15, 2026

## Summary
Removed clinical jargon from site copy, updated favicon to Marpe logo, fixed collapsible card grid stretching issue.

---

## Files Modified

### Copy Changes (Clinical Jargon Removal)
- `src/components/home/FoodsToAvoid.tsx` - "Addressing the underlying cause" → "Why it matters"
- `src/components/home/ApprovedFoods.tsx` - Removed "nutritional program" language
- `src/app/recipes/page.tsx` - "protocols designed to support cellular integrity" → "Delicious, detox-friendly recipes"
- `src/components/home/SupportSuggestions.tsx` - "Holistic approaches" → "Simple habits that help your body heal faster"
- `src/components/home/TipsAndReminders.tsx` - "reduce toxic load" → "give your body a break from chemicals"
- `src/components/home/Hero.tsx` - "Identify underlying triggers" → "Learn which foods to avoid"

### Favicon Update
- `src/app/icon.png` (created) - 32x32 Marpe logo for browser tabs
- `src/app/apple-icon.png` (created) - 180x180 for iOS home screen
- `src/app/favicon.ico` (deleted) - Old generic favicon removed

### Grid Fix
- `src/components/home/SupportSuggestions.tsx` - Added `items-start` to grid to prevent collapsed cards from stretching

---

## Problems Solved

1. **Clinical jargon throughout site** - Tyler wanted copy that sounds human, not doctoral. Rewrote 6 sections with plain, friendly language. Key tone: "Detox is about eating clean and resetting your body."

2. **Generic favicon** - Replaced with the colorful fruit/vegetable apple Marpe logo using sharp to resize.

3. **Collapsible cards stretching** - In 2-column grid, collapsed cards were stretching to match expanded neighbors. Fixed with CSS `items-start`.

---

## Decisions Made

- **Tone for copy**: Conversational, direct, uses "you" and "your body" - not clinical wellness-speak
- **Next.js favicon approach**: Used `icon.png` and `apple-icon.png` in app directory (Next.js 13+ convention) instead of manual link tags

---

## Commits
1. `cc5e6ef` - Remove clinical jargon from site copy
2. `42cd03b` - Update favicon to Marpe logo
3. `49723f0` - Fix collapsible cards stretching to match row height

---

## Next Steps
- Site is deployed to Railway
- No outstanding tasks for this session
