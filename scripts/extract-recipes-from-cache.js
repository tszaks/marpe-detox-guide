#!/usr/bin/env node
/**
 * Extract recipe data from Next.js HTML cache files
 * Run: node scripts/extract-recipes-from-cache.js
 */

const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '../.next/server/app/recipes');
const OUTPUT_FILE = path.join(__dirname, '../recovered-recipes.json');
const SQL_OUTPUT = path.join(__dirname, '../restore-recipes.sql');

function extractTextBetween(html, startMarker, endMarker) {
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return null;
  const endIdx = html.indexOf(endMarker, startIdx + startMarker.length);
  if (endIdx === -1) return null;
  return html.substring(startIdx + startMarker.length, endIdx);
}

function extractRecipeFromHtml(html, slug) {
  const recipe = {
    slug,
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
    recipe_types: [],
    submitter_name: 'Luisa Szakacs',
    status: 'approved'
  };

  // Extract recipe name from <h1>
  const h1Match = html.match(/<h1[^>]*class="[^"]*text-2xl font-bold[^"]*"[^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    recipe.name = h1Match[1].trim();
  }

  // Extract description from meta tag
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  if (descMatch) {
    recipe.description = descMatch[1].trim();
  }

  // Extract recipe types from badges
  const typeMatches = html.matchAll(/class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium[^"]*"[^>]*>([^<]+)<\/span>/g);
  for (const match of typeMatches) {
    const type = match[1].trim();
    if (type && !recipe.recipe_types.includes(type)) {
      recipe.recipe_types.push(type);
    }
  }

  // Extract ingredients - look for text in ingredient list items
  const ingredientMatches = html.matchAll(/class="text-\[var\(--foreground\)\]">([^<]+)<\/span><\/li>/g);
  for (const match of ingredientMatches) {
    const ingredient = match[1].trim();
    if (ingredient) {
      recipe.ingredients.push(ingredient);
    }
  }

  // Extract instructions - look for instruction paragraphs
  const instructionMatches = html.matchAll(/class="flex-1 text-\[var\(--foreground\)\] pt-1">([^<]+)<\/p>/g);
  for (const match of instructionMatches) {
    const instruction = match[1].trim();
    if (instruction) {
      recipe.instructions.push(instruction);
    }
  }

  // Extract submitter name
  const submitterMatch = html.match(/Submitted by <!-- -->([^<]+)<\/span>/);
  if (submitterMatch) {
    recipe.submitter_name = submitterMatch[1].trim();
  }

  return recipe;
}

function escapeSQL(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

function arrayToSQL(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  const escaped = arr.map(item => escapeSQL(item));
  return `ARRAY['${escaped.join("','")}']`;
}

async function main() {
  const files = fs.readdirSync(CACHE_DIR)
    .filter(f => f.endsWith('.html') && !f.includes('[slug]'));

  console.log(`Found ${files.length} recipe HTML files`);

  const recipes = [];

  for (const file of files) {
    const slug = file.replace('.html', '');
    const htmlPath = path.join(CACHE_DIR, file);
    const html = fs.readFileSync(htmlPath, 'utf-8');

    const recipe = extractRecipeFromHtml(html, slug);

    if (recipe.name && recipe.ingredients.length > 0) {
      recipes.push(recipe);
      console.log(`✓ Extracted: ${recipe.name} (${recipe.ingredients.length} ingredients, ${recipe.instructions.length} steps)`);
    } else {
      console.log(`✗ Failed to extract: ${slug}`);
    }
  }

  // Save JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(recipes, null, 2));
  console.log(`\nSaved ${recipes.length} recipes to ${OUTPUT_FILE}`);

  // Generate SQL
  let sql = '-- Recipe restoration SQL\n';
  sql += '-- Generated from Next.js cache on ' + new Date().toISOString() + '\n\n';
  sql += 'DELETE FROM recipes WHERE status = \'approved\';\n\n';

  for (const recipe of recipes) {
    sql += `INSERT INTO recipes (name, slug, description, ingredients, instructions, recipe_types, submitter_name, status) VALUES (\n`;
    sql += `  '${escapeSQL(recipe.name)}',\n`;
    sql += `  '${escapeSQL(recipe.slug)}',\n`;
    sql += `  '${escapeSQL(recipe.description)}',\n`;
    sql += `  ${arrayToSQL(recipe.ingredients)},\n`;
    sql += `  ${arrayToSQL(recipe.instructions)},\n`;
    sql += `  ${arrayToSQL(recipe.recipe_types)},\n`;
    sql += `  '${escapeSQL(recipe.submitter_name)}',\n`;
    sql += `  'approved'\n`;
    sql += `);\n\n`;
  }

  fs.writeFileSync(SQL_OUTPUT, sql);
  console.log(`Saved SQL to ${SQL_OUTPUT}`);
}

main().catch(console.error);
