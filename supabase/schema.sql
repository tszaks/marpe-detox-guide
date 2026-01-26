-- Recipes table for Marpe Detox Guide
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  instructions TEXT[] NOT NULL DEFAULT '{}',
  serving_suggestions TEXT[] DEFAULT '{}',
  recipe_types TEXT[] NOT NULL DEFAULT '{}',
  submitter_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster slug lookups
CREATE INDEX idx_recipes_slug ON recipes(slug);

-- Index for filtering by status
CREATE INDEX idx_recipes_status ON recipes(status);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Public can read approved recipes
CREATE POLICY "Anyone can view approved recipes"
  ON recipes FOR SELECT
  USING (status = 'approved');

-- Public can insert new submissions (they go to pending)
CREATE POLICY "Anyone can submit recipes"
  ON recipes FOR INSERT
  WITH CHECK (status = 'pending');

-- Seed with initial recipes from the mock data
INSERT INTO recipes (name, slug, description, ingredients, instructions, recipe_types, submitter_name, status) VALUES
('Spinach Vegetable Soup', 'spinach-vegetable-soup', 'A nourishing vegetable soup packed with spinach and detox-friendly ingredients.', ARRAY['Spinach', 'Vegetable broth', 'Onions', 'Garlic', 'Carrots', 'Celery'], ARRAY['Sauté vegetables in a pot.', 'Add broth and simmer.', 'Stir in spinach until wilted.', 'Serve warm.'], ARRAY['Entrees', 'Soup'], 'Luisa Szakacs', 'approved'),
('Dijon Roasted Turkey', 'dijon-roasted-turkey', 'Flavorful roasted turkey with a zesty Dijon mustard coating.', ARRAY['Turkey breast', 'Dijon mustard', 'Olive oil', 'Herbs', 'Salt', 'Pepper'], ARRAY['Preheat oven.', 'Rub turkey with mustard mixture.', 'Roast until cooked through.'], ARRAY['Entrees'], 'Luisa Szakacs', 'approved'),
('Baked Sweet-Potato Slices', 'baked-sweet-potato-slices', 'Simple and satisfying sweet potato slices baked to perfection.', ARRAY['Sweet potatoes', 'Olive oil', 'Sea salt'], ARRAY['Slice sweet potatoes.', 'Toss with oil and salt.', 'Bake until tender.'], ARRAY['Side'], 'Luisa Szakacs', 'approved'),
('Cajun Salmon', 'cajun-salmon', 'Spicy and healthy salmon fillets with Cajun seasoning.', ARRAY['Salmon fillets', 'Cajun seasoning (sugar-free)', 'Lemon', 'Oil'], ARRAY['Coat salmon with seasoning.', 'Pan-sear or bake until flaky.'], ARRAY['Entrees', 'Seafood'], 'Luisa Szakacs', 'approved'),
('Lemon Pepper Asparagus', 'lemon-pepper-asparagus', 'Crisp asparagus spears with a bright lemon zest.', ARRAY['Asparagus', 'Lemon juice', 'Black pepper', 'Olive oil'], ARRAY['Toss asparagus with ingredients.', 'Roast or grill lightly.'], ARRAY['Side', 'Vegetable'], 'Luisa Szakacs', 'approved'),
('Lentil Soup', 'lentil-soup', 'Hearty lentil soup rich in fiber and plant-based protein.', ARRAY['Lentils', 'Vegetable broth', 'Carrots', 'Onions', 'Celery', 'Tomatoes'], ARRAY['Combine all ingredients in a pot.', 'Simmer until lentils are tender.'], ARRAY['Entrees', 'Soup'], 'Luisa Szakacs', 'approved'),
('Roasted Garlic & Sweet Potato Soup', 'roasted-garlic-sweet-potato-soup', 'Creamy and comforting soup with roasted garlic depth.', ARRAY['Sweet potatoes', 'Garlic bulbs', 'Vegetable broth', 'Coconut milk (optional)'], ARRAY['Roast garlic and sweet potatoes.', 'Blend with broth until smooth.'], ARRAY['Entrees', 'Soup'], 'Luisa Szakacs', 'approved'),
('Flaxseed Crackers', 'flaxseed-crackers', 'Crunchy homemade crackers made from flaxseeds.', ARRAY['Flaxseeds', 'Water', 'Seasonings'], ARRAY['Mix flaxseeds and water.', 'Spread thin on baking sheet.', 'Bake at low temp until crisp.'], ARRAY['Snacks'], 'Luisa Szakacs', 'approved'),
('Kale Chips', 'kale-chips', 'A crispy, salty snack alternative to potato chips.', ARRAY['Kale', 'Olive oil', 'Sea salt'], ARRAY['Massage oil into kale leaves.', 'Bake until crispy but not burnt.'], ARRAY['Snacks'], 'Luisa Szakacs', 'approved'),
('Lentil-Stuffed Zucchini Boats', 'lentil-stuffed-zucchini-boats', 'Zucchini halves filled with a savory lentil mixture.', ARRAY['Zucchini', 'Cooked lentils', 'Tomato sauce (sugar-free)', 'Herbs'], ARRAY['Hollow out zucchini.', 'Fill with lentil mixture.', 'Bake until zucchini is tender.'], ARRAY['Entrees'], 'Luisa Szakacs', 'approved'),
('Avocado Chimichurri on Cucumber', 'avocado-chimichurri-cucumber', 'Fresh cucumber slices topped with zesty avocado.', ARRAY['Cucumber slices', 'Avocado', 'Parsley', 'Garlic', 'Vinegar'], ARRAY['Mash avocado with herbs.', 'Dollop onto cucumber slices.'], ARRAY['Snacks'], 'Luisa Szakacs', 'approved'),
('Roasted Cauliflower & Brussel Sprouts', 'roasted-cauliflower-brussel-sprouts', 'A classic roasted vegetable duo.', ARRAY['Cauliflower', 'Brussels sprouts', 'Olive oil', 'Salt'], ARRAY['Chop vegetables.', 'Roast in oven until golden.'], ARRAY['Side'], 'Luisa Szakacs', 'approved'),
('Faux-Tatoes', 'faux-tatoes', 'Mashed cauliflower that mimics mashed potatoes.', ARRAY['Cauliflower', 'Garlic', 'Olive oil/Ghee', 'Salt'], ARRAY['Steam cauliflower.', 'Mash or blend with garlic and oil.'], ARRAY['Side'], 'Luisa Szakacs', 'approved'),
('Zucchini Hummus', 'zucchini-hummus', 'A legume-free hummus alternative using zucchini.', ARRAY['Zucchini (peeled)', 'Tahini', 'Lemon juice', 'Garlic', 'Cumin'], ARRAY['Blend all ingredients until smooth.'], ARRAY['Snacks', 'Side'], 'Luisa Szakacs', 'approved'),
('Detox Cookies', 'detox-cookies', 'Simple treats made with approved ingredients.', ARRAY['Banana', 'Coconut flakes', 'Cinnamon'], ARRAY['Mash banana.', 'Mix with coconut.', 'Bake until firm.'], ARRAY['Dessert', 'Snacks'], 'Luisa Szakacs', 'approved'),
('Bone Broth', 'bone-broth', 'Healing broth rich in minerals.', ARRAY['Bones (chicken/beef)', 'Water', 'Apple cider vinegar', 'Vegetable scraps'], ARRAY['Simmer bones and water for 12-24 hours.', 'Strain and drink.'], ARRAY['Beverage'], 'Luisa Szakacs', 'approved'),
('Chickpea Salad', 'chickpea-salad', 'Fresh salad with protein-rich chickpeas.', ARRAY['Chickpeas', 'Cucumber', 'Tomato', 'Parsley', 'Lemon dressing'], ARRAY['Toss all ingredients together.'], ARRAY['Entrees'], 'Luisa Szakacs', 'approved'),
('Cracklin'' Cauliflower', 'cracklin-cauliflower', 'Spiced roasted cauliflower florets.', ARRAY['Cauliflower', 'Spices', 'Oil'], ARRAY['Roast until crispy edges form.'], ARRAY['Entrees', 'Side'], 'Luisa Szakacs', 'approved'),
('Mediterranean Turkey Zucchini Boats', 'mediterranean-turkey-zucchini-boats', 'Tender zucchini boats stuffed with seasoned ground turkey, sun-dried tomatoes, kalamata olives, and fresh herbs. A protein-packed Mediterranean-inspired dish perfect for Day 11 and beyond.', ARRAY['4 medium zucchini', '1 lb ground turkey', '1 tbsp olive oil', '1 medium yellow onion, diced', '3 cloves garlic, minced', '1/4 cup sun-dried tomatoes (oil-packed), chopped', '1/4 cup kalamata olives, pitted and chopped', '1 tsp dried oregano', '1 tsp dried basil', '1/2 tsp sea salt', '1/4 tsp black pepper', '1/4 tsp red pepper flakes (optional)', 'Fresh basil leaves for garnish', 'Lemon wedges for serving'], ARRAY['Preheat oven to 375°F (190°C).', 'Cut zucchini in half lengthwise and scoop out the flesh with a spoon, leaving a 1/4-inch border to create boats. Reserve the scooped flesh.', 'Place zucchini boats on a baking sheet, drizzle with olive oil, and season with salt. Bake for 10 minutes until slightly tender.', 'While zucchini bakes, heat olive oil in a large skillet over medium-high heat.', 'Add onion and cook for 3-4 minutes until softened. Add garlic and cook 1 minute more.', 'Add ground turkey, breaking it apart, and cook until browned and no longer pink, about 5-6 minutes.', 'Chop the reserved zucchini flesh and add to the turkey along with oregano, basil, salt, pepper, and red pepper flakes.', 'Stir in sun-dried tomatoes and kalamata olives. Cook for 2-3 minutes until well combined.', 'Remove zucchini boats from oven and fill each generously with the turkey mixture.', 'Return to oven and bake for 15-20 minutes until zucchini is tender and filling is heated through.', 'Garnish with fresh basil leaves and serve with lemon wedges.'], ARRAY['Entrees', 'Client Submission'], 'Luisa Szakacs', 'approved'),
('Avocado Toast with Black Beans', 'avocado-toast-black-beans', 'Creamy mashed avocado and seasoned black beans served on roasted sweet potato rounds - a detox-friendly twist on classic avocado toast with no bread required!', ARRAY['2 large sweet potatoes, sliced into 1/2-inch rounds', '2 ripe avocados', '1 can (15 oz) black beans, drained and rinsed', '1 tbsp olive oil', '1/2 medium red onion, finely diced', '2 cloves garlic, minced', '1 tsp cumin', '1/2 tsp smoked paprika', '1/4 tsp cayenne pepper (optional)', '1 lime, juiced', '1/4 cup fresh cilantro, chopped', '1 cup cherry tomatoes, quartered', '1/2 tsp sea salt', '1/4 tsp black pepper'], ARRAY['Preheat oven to 400°F (200°C).', 'Arrange sweet potato rounds on a baking sheet, brush with olive oil, and season with salt and pepper.', 'Roast for 20-25 minutes, flipping halfway, until tender and lightly golden.', 'While sweet potatoes roast, heat remaining olive oil in a skillet over medium heat.', 'Add red onion and cook for 2-3 minutes until softened. Add garlic and cook 1 minute more.', 'Add black beans, cumin, smoked paprika, cayenne, salt, and half the lime juice. Cook for 5 minutes until heated through and slightly mashed.', 'In a bowl, mash avocados with remaining lime juice, salt, and pepper until desired consistency.', 'Combine cherry tomatoes with a pinch of salt and half the cilantro.', 'To assemble: spread mashed avocado on each sweet potato round, top with seasoned black beans, then add tomato mixture.', 'Garnish with remaining fresh cilantro and serve immediately.'], ARRAY['Entrees', 'Snacks', 'Client Submission'], 'Luisa Szakacs', 'approved'),
('Stuffed Peppers with Turkey', 'stuffed-peppers-with-turkey', 'Colorful bell peppers stuffed with savory seasoned ground turkey, vegetables, and a zesty tomato sauce. A hearty, satisfying meal for Day 11 and beyond.', ARRAY['4 large bell peppers (any color)', '1 lb lean ground turkey', '1 tbsp olive oil', '1 medium onion, finely diced', '3 cloves garlic, minced', '1 medium zucchini, diced small', '1 cup diced tomatoes (fresh or canned, no sugar added)', '1 can (8 oz) tomato sauce (no sugar added)', '1 tsp ground cumin', '1 tsp chili powder', '1/2 tsp smoked paprika', '1/2 tsp dried oregano', '1/2 tsp sea salt', '1/4 tsp black pepper', '1/4 cup fresh cilantro or parsley, chopped'], ARRAY['Preheat oven to 375°F (190°C).', 'Cut the tops off bell peppers and remove seeds and membranes. If needed, slice a thin piece off the bottom so they stand upright.', 'Bring a large pot of salted water to a boil. Blanch peppers for 3 minutes, then remove and drain upside down.', 'Heat olive oil in a large skillet over medium-high heat. Add onion and cook 3-4 minutes until softened.', 'Add garlic and zucchini, cook for 2-3 minutes.', 'Add ground turkey, breaking it apart, and cook until browned, about 5-6 minutes.', 'Stir in diced tomatoes, half the tomato sauce, cumin, chili powder, paprika, oregano, salt, and pepper.', 'Simmer for 5 minutes until flavors meld. Remove from heat and stir in half the fresh herbs.', 'Place blanched peppers upright in a baking dish. Spoon turkey mixture into each pepper.', 'Pour remaining tomato sauce around the base of the peppers and drizzle a little over each top.', 'Cover with foil and bake for 25 minutes. Remove foil and bake 10 more minutes until peppers are tender.', 'Garnish with remaining fresh herbs and serve hot.'], ARRAY['Entrees', 'Client Submission'], 'Luisa Szakacs', 'approved'),
('Homemade Greek Dressing', 'homemade-greek-dressing', 'A bright, tangy homemade Greek dressing made with olive oil, lemon, garlic, and oregano. Perfect for salads, roasted vegetables, or as a marinade. Ready in 5 minutes!', ARRAY['1/2 cup extra-virgin olive oil', '3 tbsp red wine vinegar', '1 tbsp fresh lemon juice', '2 cloves garlic, minced or pressed', '1 tsp Dijon mustard', '1 tsp dried oregano', '1/2 tsp sea salt', '1/4 tsp black pepper', '1/4 tsp dried basil (optional)'], ARRAY['Add all ingredients to a small jar with a tight-fitting lid.', 'Shake vigorously for 30 seconds until well combined and slightly emulsified.', 'Alternatively, whisk all ingredients together in a small bowl until combined.', 'Taste and adjust seasoning as needed - add more lemon for brightness or salt to taste.', 'Use immediately or store in the refrigerator for up to 5 days.', 'Shake or whisk again before each use as the oil will separate.', 'Drizzle over Greek salads, roasted vegetables, or use as a marinade for proteins.'], ARRAY['Condiments', 'Client Submission'], 'Luisa Szakacs', 'approved');
