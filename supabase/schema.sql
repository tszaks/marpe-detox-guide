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
('Cracklin'' Cauliflower', 'cracklin-cauliflower', 'Spiced roasted cauliflower florets.', ARRAY['Cauliflower', 'Spices', 'Oil'], ARRAY['Roast until crispy edges form.'], ARRAY['Entrees', 'Side'], 'Luisa Szakacs', 'approved');
