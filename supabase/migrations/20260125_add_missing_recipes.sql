-- Migration: Add 4 missing recipes requested by Luisa (January 25, 2026)
-- All recipes are detox-approved: no dairy, grains, sugar, nuts, eggs, mushrooms
-- To apply: Run this SQL in your Supabase SQL editor or via CLI

INSERT INTO recipes (name, slug, description, ingredients, instructions, recipe_types, submitter_name, status) VALUES

-- 1. Mediterranean Turkey Zucchini Boats (Day 11+ recipe - contains turkey)
(
  'Mediterranean Turkey Zucchini Boats',
  'mediterranean-turkey-zucchini-boats',
  'Tender zucchini boats stuffed with seasoned ground turkey, sun-dried tomatoes, kalamata olives, and fresh herbs. A protein-packed Mediterranean-inspired dish perfect for Day 11 and beyond.',
  ARRAY[
    '4 medium zucchini',
    '1 lb ground turkey',
    '1 tbsp olive oil',
    '1 medium yellow onion, diced',
    '3 cloves garlic, minced',
    '1/4 cup sun-dried tomatoes (oil-packed), chopped',
    '1/4 cup kalamata olives, pitted and chopped',
    '1 tsp dried oregano',
    '1 tsp dried basil',
    '1/2 tsp sea salt',
    '1/4 tsp black pepper',
    '1/4 tsp red pepper flakes (optional)',
    'Fresh basil leaves for garnish',
    'Lemon wedges for serving'
  ],
  ARRAY[
    'Preheat oven to 375°F (190°C).',
    'Cut zucchini in half lengthwise and scoop out the flesh with a spoon, leaving a 1/4-inch border to create boats. Reserve the scooped flesh.',
    'Place zucchini boats on a baking sheet, drizzle with olive oil, and season with salt. Bake for 10 minutes until slightly tender.',
    'While zucchini bakes, heat olive oil in a large skillet over medium-high heat.',
    'Add onion and cook for 3-4 minutes until softened. Add garlic and cook 1 minute more.',
    'Add ground turkey, breaking it apart, and cook until browned and no longer pink, about 5-6 minutes.',
    'Chop the reserved zucchini flesh and add to the turkey along with oregano, basil, salt, pepper, and red pepper flakes.',
    'Stir in sun-dried tomatoes and kalamata olives. Cook for 2-3 minutes until well combined.',
    'Remove zucchini boats from oven and fill each generously with the turkey mixture.',
    'Return to oven and bake for 15-20 minutes until zucchini is tender and filling is heated through.',
    'Garnish with fresh basil leaves and serve with lemon wedges.'
  ],
  ARRAY['Entrees', 'Client Submission'],
  'Luisa Szakacs',
  'approved'
),

-- 2. Avocado Toast with Black Beans (on sweet potato - no bread!)
(
  'Avocado Toast with Black Beans',
  'avocado-toast-black-beans',
  'Creamy mashed avocado and seasoned black beans served on roasted sweet potato rounds - a detox-friendly twist on classic avocado toast with no bread required!',
  ARRAY[
    '2 large sweet potatoes, sliced into 1/2-inch rounds',
    '2 ripe avocados',
    '1 can (15 oz) black beans, drained and rinsed',
    '1 tbsp olive oil',
    '1/2 medium red onion, finely diced',
    '2 cloves garlic, minced',
    '1 tsp cumin',
    '1/2 tsp smoked paprika',
    '1/4 tsp cayenne pepper (optional)',
    '1 lime, juiced',
    '1/4 cup fresh cilantro, chopped',
    '1 cup cherry tomatoes, quartered',
    '1/2 tsp sea salt',
    '1/4 tsp black pepper'
  ],
  ARRAY[
    'Preheat oven to 400°F (200°C).',
    'Arrange sweet potato rounds on a baking sheet, brush with olive oil, and season with salt and pepper.',
    'Roast for 20-25 minutes, flipping halfway, until tender and lightly golden.',
    'While sweet potatoes roast, heat remaining olive oil in a skillet over medium heat.',
    'Add red onion and cook for 2-3 minutes until softened. Add garlic and cook 1 minute more.',
    'Add black beans, cumin, smoked paprika, cayenne, salt, and half the lime juice. Cook for 5 minutes until heated through and slightly mashed.',
    'In a bowl, mash avocados with remaining lime juice, salt, and pepper until desired consistency.',
    'Combine cherry tomatoes with a pinch of salt and half the cilantro.',
    'To assemble: spread mashed avocado on each sweet potato round, top with seasoned black beans, then add tomato mixture.',
    'Garnish with remaining fresh cilantro and serve immediately.'
  ],
  ARRAY['Entrees', 'Snacks', 'Client Submission'],
  'Luisa Szakacs',
  'approved'
),

-- 3. Stuffed Peppers with Turkey (Day 11+ recipe - contains turkey)
(
  'Stuffed Peppers with Turkey',
  'stuffed-peppers-with-turkey',
  'Colorful bell peppers stuffed with savory seasoned ground turkey, vegetables, and a zesty tomato sauce. A hearty, satisfying meal for Day 11 and beyond.',
  ARRAY[
    '4 large bell peppers (any color)',
    '1 lb lean ground turkey',
    '1 tbsp olive oil',
    '1 medium onion, finely diced',
    '3 cloves garlic, minced',
    '1 medium zucchini, diced small',
    '1 cup diced tomatoes (fresh or canned, no sugar added)',
    '1 can (8 oz) tomato sauce (no sugar added)',
    '1 tsp ground cumin',
    '1 tsp chili powder',
    '1/2 tsp smoked paprika',
    '1/2 tsp dried oregano',
    '1/2 tsp sea salt',
    '1/4 tsp black pepper',
    '1/4 cup fresh cilantro or parsley, chopped'
  ],
  ARRAY[
    'Preheat oven to 375°F (190°C).',
    'Cut the tops off bell peppers and remove seeds and membranes. If needed, slice a thin piece off the bottom so they stand upright.',
    'Bring a large pot of salted water to a boil. Blanch peppers for 3 minutes, then remove and drain upside down.',
    'Heat olive oil in a large skillet over medium-high heat. Add onion and cook 3-4 minutes until softened.',
    'Add garlic and zucchini, cook for 2-3 minutes.',
    'Add ground turkey, breaking it apart, and cook until browned, about 5-6 minutes.',
    'Stir in diced tomatoes, half the tomato sauce, cumin, chili powder, paprika, oregano, salt, and pepper.',
    'Simmer for 5 minutes until flavors meld. Remove from heat and stir in half the fresh herbs.',
    'Place blanched peppers upright in a baking dish. Spoon turkey mixture into each pepper.',
    'Pour remaining tomato sauce around the base of the peppers and drizzle a little over each top.',
    'Cover with foil and bake for 25 minutes. Remove foil and bake 10 more minutes until peppers are tender.',
    'Garnish with remaining fresh herbs and serve hot.'
  ],
  ARRAY['Entrees', 'Client Submission'],
  'Luisa Szakacs',
  'approved'
),

-- 4. Homemade Greek Dressing (all phases - plant-based)
(
  'Homemade Greek Dressing',
  'homemade-greek-dressing',
  'A bright, tangy homemade Greek dressing made with olive oil, lemon, garlic, and oregano. Perfect for salads, roasted vegetables, or as a marinade. Ready in 5 minutes!',
  ARRAY[
    '1/2 cup extra-virgin olive oil',
    '3 tbsp red wine vinegar',
    '1 tbsp fresh lemon juice',
    '2 cloves garlic, minced or pressed',
    '1 tsp Dijon mustard',
    '1 tsp dried oregano',
    '1/2 tsp sea salt',
    '1/4 tsp black pepper',
    '1/4 tsp dried basil (optional)'
  ],
  ARRAY[
    'Add all ingredients to a small jar with a tight-fitting lid.',
    'Shake vigorously for 30 seconds until well combined and slightly emulsified.',
    'Alternatively, whisk all ingredients together in a small bowl until combined.',
    'Taste and adjust seasoning as needed - add more lemon for brightness or salt to taste.',
    'Use immediately or store in the refrigerator for up to 5 days.',
    'Shake or whisk again before each use as the oil will separate.',
    'Drizzle over Greek salads, roasted vegetables, or use as a marinade for proteins.'
  ],
  ARRAY['Condiments', 'Client Submission'],
  'Luisa Szakacs',
  'approved'
);
