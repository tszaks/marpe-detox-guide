# CLAUDE.md - Marpe Detox Guide

## Project Overview
- **Site:** [startmydetox.com](https://startmydetox.com)
- **Tech Stack:** Next.js, TypeScript, Tailwind CSS, Supabase
- **Hosting:** Railway (production)
- **Database:** Supabase (project: `drzwmevzograxjsfgmze` / "Marpe Nutrition")

## Deployment
- **Platform:** Railway
- **Auto-deploys:** On push to main branch
- **Domain:** startmydetox.com

## Database (Supabase)
- **Project ID:** `drzwmevzograxjsfgmze`
- **Project Name:** Marpe Nutrition
- **Region:** us-east-1

### Key Tables
- `recipes` - All recipes with approval workflow (status: pending/approved/rejected)

### Recipe Submission Flow
1. Client submits via form on `/recipes` page
2. Recipe inserted with `status: 'pending'` and `recipe_types: ['Client Submission']`
3. Admin must approve (change status to 'approved') for recipe to appear on site
4. Only `status = 'approved'` recipes are visible to public (RLS policy)

## Environment Variables
Required in both `.env.local` and Railway:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Quick Commands
```bash
# Run locally
npm run dev

# Check Railway variables
railway variables

# Deploy manually (usually auto-deploys)
railway up
```

## Notes
- Luisa Szakacs is the primary recipe author (Tyler's mom)
- "Client Submission" is a recipe_type tag for user-submitted recipes
- Recipe approval is done directly in Supabase dashboard (update status column)
