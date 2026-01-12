# Marpé Nutrition Detox Guide Website - Specification

## Why (The Problem)

### Business Case
- **Current State:** Notion-hosted detox guide at mydetox.notion.site
- **Problems:**
  - Too slow/clunky — Notion requires JavaScript hydration, poor mobile UX
  - Hard to update — Notion's editing experience isn't ideal for non-tech users
  - Doesn't look professional — Generic Notion styling, no brand consistency
  - Missing functionality — No native recipe submissions, no search/filter
- **Urgency:** ASAP — The January 2026 detox program is ALREADY RUNNING

### User Need
- **Existing clients** need easy access to detox recipes, food lists, and tips during their 28-day program
- **New prospects** should be impressed by professional presentation and convert to bookings

---

## User Experience

### Target Audience
- Both existing Marpé Nutrition clients AND new prospects finding the site via search/social

### Site Structure

```
Homepage
├── Hero (apple image + welcome message)
├── Announcements (recipe contest, booking CTA)
├── Quick Links (Book, Facebook, YouTube, Pinterest, Contact)
├── Recipe Browser (search + filter)
├── Foods to Avoid (expandable list)
├── Approved Foods (categorized list)
├── Tips & Reminders
├── Additional Support Suggestions
└── Footer (links, contact)

/recipes
├── Full recipe database
├── Search bar
├── Filters (category, etc.)
└── Individual recipe cards → detail view

/recipes/[slug]
├── Recipe title + image
├── Ingredients list
├── Instructions
├── Category/tags
└── Back to recipes

/submit-recipe
├── Submission form
├── Fields: Name, Recipe Name, Ingredients, Instructions
├── Success confirmation
└── Contest info

/testimonials
├── Quick wins section
└── Full client testimonials
```

### Key User Flows

**1. Browse Recipes**
- User lands on homepage → scrolls to recipe section
- Can search by keyword or filter by category
- Clicks recipe card → views full recipe
- Can navigate back or browse more

**2. Submit Recipe (Contest)**
- User clicks "Submit Recipe" CTA
- Fills form: name, recipe name, ingredients, instructions
- Submits → sees success message
- Tyler receives email notification
- Submission appears in Notion with "Pending" status
- Tyler reviews, changes to "Approved" → recipe goes live on site

**3. Book Appointment**
- User clicks "Book Appointment" link
- Redirects to Square booking page (external)

---

## Technical Implementation

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Notion API (recipes database)
- **Email:** Resend or Gmail API (submission notifications)
- **Deployment:** Railway (after localhost dev)
- **Domain:** TBD (temporary Railway URL for now)

### Architecture

```
/app
├── page.tsx                 # Homepage
├── layout.tsx               # Root layout (nav, footer)
├── recipes/
│   ├── page.tsx             # Recipe browser with search/filter
│   └── [slug]/page.tsx      # Individual recipe detail
├── submit-recipe/
│   └── page.tsx             # Recipe submission form
├── testimonials/
│   └── page.tsx             # Testimonials page
├── api/
│   └── submit-recipe/
│       └── route.ts         # API: save to Notion + send email
/components
├── RecipeCard.tsx
├── RecipeFilter.tsx
├── SearchBar.tsx
├── FoodList.tsx
├── TestimonialCard.tsx
├── SubmissionForm.tsx
└── ...
/lib
├── notion.ts                # Notion API client
├── email.ts                 # Email sending utility
└── types.ts                 # TypeScript types
```

### Notion Integration

**Existing Recipes Database:** `895cc939-aa32-4fe0-9264-6592f9f62dce`

**Required Properties (verify/add):**
- Title (recipe name)
- Ingredients (rich text)
- Instructions (rich text)
- Category (select: Breakfast, Lunch, Dinner, Snack, Soup, Side, etc.)
- Status (select: Approved, Pending) — **ADD THIS**
- Submitter Name (text) — **ADD THIS** (for user submissions)
- Slug (text or formula) — for URL routing

**API Operations:**
1. **READ recipes** — Query database with filter `Status = "Approved"`
2. **CREATE submission** — Add new page with `Status = "Pending"`

### Recipe Submission Flow

```
User submits form
       ↓
POST /api/submit-recipe
       ↓
┌──────────────────────────────────────┐
│ 1. Validate form data                │
│ 2. Create Notion page (Status: Pending) │
│ 3. Send email notification to Tyler  │
│ 4. Return success response           │
└──────────────────────────────────────┘
       ↓
User sees success message
       ↓
Tyler reviews in Notion → changes Status to "Approved"
       ↓
Recipe appears on site (next page load/rebuild)
```

### Design Specs

**Colors (from marpenutrition.com):**
- Primary: `#1F5413` (dark blue-green)
- Background: `#FFFFFF` (white)
- Text: Dark slate/navy
- Accents: Pull from recipe callout colors (green, red, yellow, blue)

**Typography:**
- Clean sans-serif (match main site)
- Clear hierarchy for headings

**Hero Image:**
- Rainbow fruit/veggie apple (provided by Tyler)
- White background, centered

**Mobile-First:**
- Responsive design
- Touch-friendly recipe cards
- Easy navigation on mobile

---

## Edge Cases & Error Handling

### Recipe Submission
- **Empty fields:** Client-side validation, show inline errors
- **Notion API failure:** Show user-friendly error, log to console
- **Email failure:** Still save to Notion, log error (don't block submission)
- **Duplicate submissions:** Allow (Tyler filters during review)
- **Spam:** Consider simple honeypot field or rate limiting (future)

### Recipe Display
- **No recipes found:** Show friendly "No recipes match your search" message
- **Notion API down:** Show cached recipes or error state
- **Missing recipe data:** Graceful fallbacks (no image = placeholder)

### Search & Filter
- **No results:** Clear messaging, suggest removing filters
- **Special characters:** Sanitize search input

---

## Implementation Plan

### Phase 1: Project Setup & Core Structure
1. [ ] Create Next.js project with Tailwind CSS
2. [ ] Set up project structure (app router, components, lib)
3. [ ] Create root layout with navigation and footer
4. [ ] Set up Notion API client with environment variables
5. [ ] Add "Status" and "Submitter Name" properties to Notion recipes DB

### Phase 2: Homepage
1. [ ] Build hero section with apple image
2. [ ] Create welcome/announcements callouts
3. [ ] Build quick links section
4. [ ] Create expandable food lists (Avoid / Approved)
5. [ ] Build tips and suggestions sections
6. [ ] Style to match marpenutrition.com branding

### Phase 3: Recipe System
1. [ ] Create Notion query for approved recipes
2. [ ] Build RecipeCard component
3. [ ] Build recipe browser page with grid layout
4. [ ] Implement search functionality
5. [ ] Implement category filter
6. [ ] Build individual recipe detail page
7. [ ] Add recipe section preview to homepage

### Phase 4: Recipe Submissions
1. [ ] Build submission form component
2. [ ] Create API route for submissions
3. [ ] Integrate Notion API to create pending recipes
4. [ ] Set up email notifications (Resend or Gmail)
5. [ ] Build success/error states

### Phase 5: Testimonials & Polish
1. [ ] Build testimonials page
2. [ ] Add testimonial cards component
3. [ ] Final responsive design pass
4. [ ] Performance optimization (images, fonts)
5. [ ] SEO meta tags

### Phase 6: Deployment
1. [ ] Test all functionality locally
2. [ ] Set up Railway project
3. [ ] Configure environment variables on Railway
4. [ ] Deploy and test production build
5. [ ] Connect custom domain (when ready)

---

## Dependencies & Prerequisites

- [ ] Notion API key with access to recipes database
- [ ] Email service credentials (Resend API key or Gmail OAuth)
- [ ] Railway account for deployment
- [ ] Apple hero image file
- [ ] Access to marpenutrition.com for branding reference

---

## Testing Approach

### Manual Testing Checklist
- [ ] Homepage loads correctly on desktop and mobile
- [ ] All quick links work (external links open in new tab)
- [ ] Recipe search returns relevant results
- [ ] Recipe filters work correctly
- [ ] Individual recipe pages display all content
- [ ] Recipe submission form validates input
- [ ] Submission creates Notion page with "Pending" status
- [ ] Email notification sent on submission
- [ ] Testimonials page displays all content
- [ ] Navigation works on all pages
- [ ] Responsive design works on mobile/tablet

### Edge Case Testing
- [ ] Submit recipe with empty fields → validation errors
- [ ] Search with no results → friendly message
- [ ] Filter with no matches → friendly message
- [ ] Long recipe names/content → proper truncation/wrapping

---

## Acceptance Criteria

- [ ] Site loads fast (<3s initial load)
- [ ] All content from Notion guide is represented
- [ ] Recipe search and filter work intuitively
- [ ] Recipe submissions save to Notion with Pending status
- [ ] Tyler receives email notification for submissions
- [ ] Design matches Marpé Nutrition branding
- [ ] Fully responsive on mobile devices
- [ ] External links (Square, social) work correctly
- [ ] Site deployed and accessible via Railway URL

---

## Key Decisions & Tradeoffs

### Notion as CMS (vs. dedicated CMS or Supabase)
**Decision:** Use Notion API for recipes
**Why:**
- Tyler already manages recipes in Notion
- No new tool for mom to learn
- Simple read/write operations
- Free tier sufficient

**Tradeoff:** Slightly slower than dedicated DB, but acceptable for this scale

### No Authentication
**Decision:** Fully public site
**Why:**
- Simplifies implementation
- Content isn't sensitive
- Goal is accessibility for all detox participants

**Tradeoff:** Can't personalize or track individual users

### Email + Notion for Submissions (vs. Supabase)
**Decision:** Write directly to Notion + email notification
**Why:**
- Single source of truth (Notion)
- Tyler reviews in familiar interface
- No extra database to maintain

**Tradeoff:** Dependent on Notion API availability

### Static Generation with Revalidation (vs. Full SSR)
**Decision:** Use ISR (Incremental Static Regeneration)
**Why:**
- Fast page loads
- Recipes update within minutes of Notion changes
- Lower server costs

**Tradeoff:** Not real-time (acceptable delay)

---

## Future Considerations

- **Daily tracking/progress:** Could add user accounts + progress tracking in v2
- **Email reminders:** Daily detox tips via email sequence
- **Recipe ratings/comments:** User engagement features
- **Print-friendly recipe pages:** PDF export
- **Multi-language support:** Spanish version
