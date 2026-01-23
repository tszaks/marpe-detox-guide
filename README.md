# Marpe Detox Guide

A web application for the Marpe Nutrition 28-Day Detox Program. Provides clients with easy access to approved recipes, food lists, tips, and program resources.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (database for recipes, testimonials, and program data)
- Lucide React (icons)

## Features

- Recipe browser with search and category filtering
- Individual recipe detail pages with ingredients and instructions
- Approved/avoided food lists
- Client testimonial submissions
- Recipe submission form for community contributions
- FAQ section
- Video resources
- Responsive, mobile-first design

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── recipes/          # Recipe browser and detail pages
│   ├── submit-recipe/    # Community recipe submission
│   ├── submit-testimonial/
│   ├── testimonials/
│   ├── faq/
│   ├── videos/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── supabase/
│   └── schema.sql        # Database schema
└── scripts/              # Utility scripts
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables for Supabase (URL and anon key)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command         | Action                        |
|:--------------- |:----------------------------- |
| `npm run dev`   | Start development server      |
| `npm run build` | Build for production          |
| `npm run start` | Start production server       |
| `npm run lint`  | Run ESLint                    |
