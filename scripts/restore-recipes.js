#!/usr/bin/env node
/**
 * Restore recipes to Supabase using service role key
 * This bypasses RLS policies
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://uwervfhjjfrnxugpdtqa.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZXJ2ZmhqamZybnh1Z3BkdHFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTAzMjMzNywiZXhwIjoyMDg0NjA4MzM3fQ.QWtMbvfYG1XjnDZEHh1MSS4jHtXo3NCuU3a0kBgaZtg';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  // Load recovered recipes
  const recipesPath = path.join(__dirname, '../recovered-recipes.json');
  const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));

  console.log(`Loaded ${recipes.length} recipes to restore`);

  // First, check if table exists by trying to select
  console.log('\nChecking if recipes table exists...');
  const { data: checkData, error: checkError } = await supabase
    .from('recipes')
    .select('count')
    .limit(1);

  if (checkError) {
    console.log('Error accessing recipes table:', checkError.message);
    console.log('\nThe recipes table may not exist. Please run this SQL in Supabase dashboard first:');
    console.log('---');
    console.log(fs.readFileSync(path.join(__dirname, '../supabase/schema.sql'), 'utf-8').split('INSERT INTO')[0]);
    console.log('---');
    return;
  }

  console.log('Table exists! Current count check passed.');

  // Delete existing approved recipes
  console.log('\nDeleting existing approved recipes...');
  const { error: deleteError } = await supabase
    .from('recipes')
    .delete()
    .eq('status', 'approved');

  if (deleteError) {
    console.log('Error deleting:', deleteError.message);
  } else {
    console.log('Existing recipes deleted.');
  }

  // Insert recipes in batches
  const BATCH_SIZE = 10;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < recipes.length; i += BATCH_SIZE) {
    const batch = recipes.slice(i, i + BATCH_SIZE);

    // Clean up HTML entities in recipe data
    const cleanedBatch = batch.map(r => ({
      name: r.name.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
      slug: r.slug,
      description: r.description?.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"') || null,
      ingredients: r.ingredients.map(i => i.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')),
      instructions: r.instructions.map(i => i.replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')),
      recipe_types: r.recipe_types,
      submitter_name: r.submitter_name,
      status: 'approved'
    }));

    const { data, error } = await supabase
      .from('recipes')
      .insert(cleanedBatch);

    if (error) {
      console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} error:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`✓ Inserted batch ${Math.floor(i/BATCH_SIZE) + 1} (${successCount}/${recipes.length})`);
    }
  }

  console.log(`\n=== RESTORATION COMPLETE ===`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  // Verify final count
  const { count, error: countError } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  if (!countError) {
    console.log(`Total recipes in database: ${count}`);
  }
}

main().catch(console.error);
