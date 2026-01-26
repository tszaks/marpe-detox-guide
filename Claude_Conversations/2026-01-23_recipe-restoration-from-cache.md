# Recipe Restoration from Next.js Cache

**Date:** January 22-23, 2026
**Project:** Marpe Detox Guide (startmydetox.com)

---

## Problem

After migrating Supabase databases (old: `neecgylnfpigxcyenhnx` -> new: `uwervfhjjfrnxugpdtqa`), the site only showed 6 recipes instead of 73. The old database was deleted.

## Root Causes

1. **Railway environment variables** were still pointing to the old (deleted) Supabase project, causing `ENOTFOUND` errors and falling back to 6 hardcoded mock recipes in `src/lib/recipes.ts`
2. **HTML entities** (`&amp;`, `&#x27;`) were baked into recipe names/ingredients when extracted from cached HTML

## Solution

### Phase 1: Recipe Recovery
- Extracted all 73 recipes from Next.js ISR cache files (`.next/server/app/recipes/*.html`)
- Created `scripts/extract-recipes-from-cache.js` to parse HTML and generate JSON + SQL
- Restored all 73 recipes to new Supabase database via SQL Editor

### Phase 2: Railway Fix
- Updated Railway environment variables to point to new Supabase project:
  - `NEXT_PUBLIC_SUPABASE_URL` -> `https://uwervfhjjfrnxugpdtqa.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` -> new anon key
- Triggered fresh deployment with `railway up`

### Phase 3: HTML Entity Fix
- Fixed 9 recipes with unescaped HTML entities in names/ingredients/instructions
- Examples: `&amp;` -> `&`, `&#x27;` -> `'`
- Fixed directly in database via Node script (no code changes needed)

## Files Modified

- No permanent code changes to the repository
- All fixes were database-level and Railway environment config
- Recovery artifacts: `recovered-recipes.json`, `restore-recipes.sql` (may still exist in repo root)

## Current State

- Site live at startmydetox.com with all 73 recipes
- All HTML entities properly decoded
- Railway correctly connected to new Supabase project

## Next Steps

- Consider cleaning up `recovered-recipes.json` and `restore-recipes.sql` from repo root
- Consider adding a periodic database backup strategy
