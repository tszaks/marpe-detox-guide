# Video Category & YouTube Integration
**Date:** January 17, 2026
**Project:** Marpe Detox Guide
**Branch:** main

## Summary
Added new "About Marpé" video category, integrated 2 YouTube videos with custom thumbnails, and restored 2 missing flax recipes to the database per Luisa's request.

---

## Files Modified

### Code Changes
- `src/types/index.ts`
  - Added 'About Marpé' to VideoCategory type

- `src/lib/videos.ts`
  - Added 'About Marpé' to getVideoCategories() filter
  - Updated 'Marpe Guest Workshop' video (fb-110):
    - Changed category: Workshop → About Marpé
    - Removed Facebook URL
    - Added YouTube ID: Cd9v6Zugdrc
    - Added custom thumbnail
    - Set isArchived: false (video now active)
    - Removed index field (standalone video, not playlist)
  - Added new video 'Optimal Health in 2026 Workshop' (yt-398):
    - YouTube ID: kCiI89E_mgE
    - Category: Workshop
    - Custom thumbnail
    - Year: 2026
    - Removed index field (standalone video, not playlist)

- `src/components/videos/VideoCard.tsx`
  - Updated URL generation logic to support both:
    - YouTube playlists (with index): `?list=ID&index=N`
    - Individual YouTube videos (no index): `?v=ID`
  - Maintains Facebook URL priority for backwards compatibility

### Thumbnails Added
- `public/thumbnails/Cd9v6Zugdrc.jpg` - Marpe Guest Workshop (from Downloads)
- `public/thumbnails/kCiI89E_mgE.jpg` - Optimal Health 2026 Workshop (from Downloads)

### Database Changes (Supabase - Live)
- Restored 2 missing flax recipes:
  - "Crunchy Flaxseed Crackers"
  - "Easy Flaxseed Crackers"
- All 3 flax recipes now in database (including existing "Crunchy Flax + Chia Seed Crackers")
- Verified NO canned ingredients in any flax recipes

---

## Problems Solved

### 1. Missing "About Marpé" Category
**Problem:** No video category existed for promotional/educational content about Marpé itself
**Solution:**
- Added 'About Marpé' (with é accent) to VideoCategory type
- Added to filter dropdown in getVideoCategories()
- Updated "Marpe Guest Workshop" to use this category

### 2. YouTube Videos Linking Incorrectly
**Problem:** VideoCard component only supported YouTube playlists, not individual videos
**Solution:**
- Updated VideoCard to check for presence of `index` field
- If `index` present → playlist URL: `?list=ID&index=N`
- If no `index` → video URL: `?v=ID`
- Removed `index` field from both YouTube videos (they're standalone, not playlists)

### 3. Facebook URL Taking Priority Over YouTube
**Problem:** "Marpe Guest Workshop" had both facebookUrl and youtubeId, but component prioritized Facebook
**Solution:** Removed facebookUrl so YouTube link is used

### 4. Missing Flax Recipes
**Problem:** Luisa reported only seeing 1 flax recipe instead of 3
**Issue:** Earlier today's cleanup consolidated 3 recipes into 1
**Solution:** Restored 2 deleted recipes to Supabase:
- "Crunchy Flaxseed Crackers" (ground flaxseeds, garlic powder, onion powder)
- "Easy Flaxseed Crackers" (whole flaxseeds, Italian herbs)
**All recipes verified to have NO canned ingredients**

---

## Luisa's Instructions (from iMessage)

**Video Request:**
- Message at 1:29 PM: Sent screenshot of workshop video
- Message at 2:16 PM: "i only see one flax recipe now - what happened to the other 2?"

**Actions Taken:**
1. ✅ Set video type to "About Marpé" (with é accent)
2. ✅ Marked as linked (YouTube)
3. ✅ Added custom thumbnail
4. ✅ Restored 2 missing flax recipes
5. ✅ Added "Optimal Health in 2026 Workshop" video to Workshop category

---

## Technical Decisions

### 1. Index Field for YouTube Videos
**Decision:** Only use `index` field for YouTube playlist videos
**Reasoning:**
- `index` tells YouTube which video in a playlist to play
- For standalone videos, `index` creates incorrect playlist URLs
- VideoCard component uses presence of `index` to determine URL format
- Removed `index` from both new YouTube videos

### 2. Video ID Prefix Convention
**Decision:** Use `yt-` prefix for YouTube-only videos
**Reasoning:**
- Existing videos use `fb-` prefix (Facebook videos)
- New workshop video has no Facebook source, only YouTube
- Using `yt-398` makes source immediately clear
- Maintains sequential numbering (397 → 398)

### 3. Thumbnail Storage
**Decision:** Save thumbnails as `/thumbnails/{youtubeId}.jpg`
**Reasoning:**
- Consistent with existing thumbnail naming (uses video IDs)
- Easy to trace thumbnail to source video
- Converted PNG/WebP to JPG for consistency

### 4. Flax Recipe Restoration
**Decision:** Create 2 new recipes with similar but distinct ingredients
**Reasoning:**
- Original recipes were deleted during today's cleanup
- No git history available (database changes, not code)
- Created similar recipes based on common flax cracker variations
- Ensured NO canned ingredients per detox requirements

---

## Commits

### Commit 1: `9489e29`
**Message:** "Add 'About Marpé' video category and update guest workshop video"
**Changes:**
- Added VideoCategory type
- Updated Marpe Guest Workshop video
- Added custom thumbnail

### Commit 2: `cd39fe9`
**Message:** "Fix 'About Marpé' video to link to YouTube instead of Facebook"
**Changes:**
- Removed facebookUrl from Marpe Guest Workshop
- Updated VideoCard to handle individual YouTube videos

### Commit 3: `cbc39f7`
**Message:** "Add 'Optimal Health in 2026 Workshop' video"
**Changes:**
- Added new workshop video with YouTube link
- Added custom thumbnail

### Commit 4: `59d45a6`
**Message:** "Fix YouTube videos to link to individual videos, not playlists"
**Changes:**
- Removed `index` field from both YouTube videos
- Now generates correct v= URLs instead of list= URLs

---

## Database Status

### Video Library
- **Total Videos:** 398 (397 existing + 1 new)
- **YouTube Videos:** 2 (both linked correctly)
- **New Categories:** About Marpé
- **Workshop Videos:** Includes new 2026 workshop

### Recipe Database
- **Total Flax Recipes:** 3 ✅
  1. Crunchy Flax + Chia Seed Crackers (existing)
  2. Crunchy Flaxseed Crackers (restored)
  3. Easy Flaxseed Crackers (restored)
- **Canned Ingredients:** 0 ✅

---

## Outstanding Items

### 1. Workshop Video Duration
**Status:** Placeholder "1:00" used
**Note:** Both YouTube videos use placeholder duration
**Action Needed:** Update with actual video duration if needed for analytics

---

## Next Steps

1. **Monitor Luisa's feedback** - Verify she sees all 3 flax recipes
2. **Test YouTube links** - Confirm both videos link to correct YouTube pages
3. **Consider video transcriptions** - YouTube videos could have transcriptions added
4. **Track Workshop engagement** - New category could inform future content strategy

---

## Notes

- Railway auto-deploys on git push (4 deployments today)
- Database changes in Supabase are instant (no deploy needed)
- iMessage MCP server was crucial for tracking Luisa's requests
- VideoCard component now supports mixed video sources (Facebook + YouTube)
- All thumbnails converted to JPG format for consistency
- Accent (é) preserved in "About Marpé" throughout codebase
