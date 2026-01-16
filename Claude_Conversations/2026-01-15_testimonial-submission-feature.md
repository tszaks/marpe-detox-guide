# Conversation Log: Testimonial Submission Feature

**Date:** January 15, 2026
**Project:** Marpe Detox Guide

---

## Summary
Added a complete testimonial submission feature allowing users to share their detox success stories, with Supabase integration and a pending/approved moderation workflow.

---

## Files Created
- `src/app/submit-testimonial/page.tsx` - Submission page with privacy callout
- `src/app/api/submit-testimonial/route.ts` - API route for form handling
- `src/lib/testimonials.ts` - Supabase submission function
- `src/components/forms/TestimonialSubmissionForm.tsx` - Form component

## Files Modified
- `src/types/index.ts` - Added TestimonialSubmission and SubmitTestimonialResponse types
- `src/lib/supabase.ts` - Added DbTestimonial type
- `src/components/forms/index.ts` - Export TestimonialSubmissionForm
- `src/components/layout/Header.tsx` - Added "Share Your Story" nav link
- `src/app/testimonials/page.tsx` - Added CTA section encouraging submissions

---

## Problems Solved

### 1. Testimonial Submission Feature
- Created full submission flow: form → API → Supabase
- Same pending/approved workflow as recipes
- RLS-aware: no `.select()` after insert (pending items can't be read back)

### 2. Privacy & Consent
- Collects full name for records
- Auto-generates initials from name
- Only displays initials publicly
- Added consent checkbox confirming user agrees to public display

### 3. Initials Auto-Generation Bug
- **Issue:** Initials only generated when field was empty
- **Fix:** Removed `!formData.initials` condition so initials update whenever name changes
- Now "Luisa Szakacs" correctly generates "LS" even if user previously typed a different name

---

## Decisions Made
- Ask for full name (for records) but only display initials publicly
- Auto-generate initials from name, always syncing when name changes
- Require explicit consent checkbox before submission
- Use same pending/approved moderation workflow as recipes

---

## Commits
1. `b4ae321` - Add testimonial submission feature with consent checkbox
2. `493cb22` - Fix initials auto-generation to update when name changes

---

## Database
- Created `testimonials` table in Supabase with columns:
  - id, name, initials, quote, status, created_at, updated_at
- RLS policies mirror recipes (public SELECT on approved only, INSERT for all)

---

## Next Steps
- None specified - feature complete
- Future: Admin interface to approve/reject testimonials
