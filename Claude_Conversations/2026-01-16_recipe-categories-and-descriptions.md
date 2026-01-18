# Recipe Categories & Descriptions - Jan 16, 2026

## Summary
Final cleanup for Marpe Detox Guide launch tomorrow morning. Fixed category display issues and added appetizing descriptions to all 76 recipes.

## Problems Solved

### 1. Category Filter Not Showing All Categories
**Issue:** Only 3 category buttons (Soup, Dessert, Beverage) were showing despite database having 9 categories.

**Root Cause:** Site had hardcoded category list ['Entrees', 'Side', 'Soup', 'Snacks'] that didn't match database categories ['Main Dish', 'Side Dish', 'Snack', etc.]. Only exact matches displayed.

**Solution:** Made `getRecipeCategories()` dynamic to query database instead of returning hardcoded array.

### 2. Lowercase Recipe Name
**Issue:** "paleo cassava flour biscuits" displayed in all lowercase.

**Solution:** Updated database to "Paleo Cassava Flour Biscuits" with proper title case.

### 3. Missing Recipe Descriptions
**Issue:** Recipe cards looked bare without descriptions - only showing title and ingredient count.

**Solution:** Generated succinct 5-8 word appetizing descriptions for all 76 recipes using sensory language (crispy, creamy, tender, zesty, vibrant).

## Files Modified

### Code Changes (Committed: `2c0c0b5`)
- **src/lib/recipes.ts** - Made `getRecipeCategories()` async to dynamically extract categories from database
- **src/app/recipes/page.tsx** - Added `await` to category loading
- **src/components/recipes/RecipeCard.tsx** - Updated icon mappings for all database categories

### Database Changes (Supabase: neecgylnfpigxcyenhnx)
- Updated 1 recipe name capitalization
- Added succinct descriptions to all 76 approved recipes

## Decisions Made

1. **Dynamic Categories Over Hardcoded:** Site now adapts to whatever categories exist in database - future-proof for new recipe types
2. **Succinct Descriptions (5-8 words):** Chose punchy descriptions over longer ones for better scanning on recipe cards
3. **Database-Only Updates:** Description updates went straight to database (no code changes needed) for faster deployment

## Technical Details

**Category Breakdown:**
- Soup: 25 recipes
- Side Dish: 15 recipes
- Main Dish: 13 recipes
- Snack: 8 recipes
- Salad: 7 recipes
- Breakfast: 5 recipes
- Sauce/Dressing: 5 recipes
- Beverage: 2 recipes
- Dessert: 1 recipe

**Multi-Category Recipes:**
Some recipes appear in multiple categories (e.g., "Detox Cookies" in both Dessert AND Snack) because `recipe_types` is an array field.

## Next Steps

✅ Site is launch-ready for tomorrow morning
- All 76 recipes have proper capitalization
- All recipes have appetizing descriptions
- All 9 categories display correctly
- Railway deployment complete

## Cache Notes

Had to restart dev server (`pkill -f "next dev" && npm run dev`) to clear Next.js ISR cache and see category changes on localhost. Railway builds from scratch so no cache issues on production.

---

**Commits:** `2c0c0b5` - Fix: Make recipe categories dynamic from database instead of hardcoded
**Deployment:** Pushed to GitHub, Railway auto-deployed
**Launch:** Ready for tomorrow morning 🚀
