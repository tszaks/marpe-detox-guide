# Marpe Detox Guide - Video Card Redesign & Filtering

**Date:** January 16, 2026

---

## Summary

Major video card UI redesign and data cleanup for the Marpe Detox Guide video library.

---

## Files Modified

- `src/types/index.ts` - Added `uploadDate` field to Video type
- `src/lib/videos.ts` - Added upload dates to 396 videos, restored 3 deleted videos, marked 13 as archived
- `src/components/videos/VideoCard.tsx` - Redesigned layout with new badge system and date display
- `src/components/videos/VideoFilter.tsx` - Fixed type dropdown to use explicit value setting
- `src/app/videos/VideoBrowser.tsx` - Updated filter handler from toggle to setter

---

## Problems Solved

### 1. Video Card Layout Redesign
- Moved Day badge from below title to top-right of image
- Added "Non-Detox" badge for archived videos
- Added "Featured" badge for pinned video
- Added upload date display below title (formatted: "January 16, 2026")
- Created `formatUploadDate()` helper for YYYYMMDD → readable date

### 2. Type Filter Not Working
- **Bug:** Dropdown's `onChange` was using toggle function, ignoring selected value
- **Fix:** Changed to explicitly set `showArchived` based on `e.target.value === 'all'`

### 3. Videos Sorted Incorrectly
- Changed sort from `index` to `uploadDate` descending (newest first)

### 4. Off-Season Detox Videos
- Found 10 videos marked as detox but uploaded outside Nov-Dec-Jan-Feb window
- Marked all as `isArchived: true` (Non-Detox)

### 5. Deleted Videos Restored
- Restored 3 accidentally deleted videos as archived:
  - Phone Detox: Breaking the Digital Sleep Connection (July 8, 2024)
  - Purse Detox: Throwing Out the Toxic Junk (August 1, 2024)
  - Breaking Fasting Rules: Vitamins During Detox Hours (June 5, 2025)

### 6. Fixed Bad Video Titles
- Renamed AI error message title to "Marpe Guest Workshop"

---

## Key Decisions

1. **Badge Priority:** Featured > Day > Non-Detox (only one shows at a time)
2. **Detox Window:** Nov, Dec, Jan, Feb - videos outside this are Non-Detox
3. **Sort Order:** Always by upload date, newest first
4. **Archive vs Delete:** Prefer marking as archived over deleting

---

## Video Stats

| Year | Detox | Non-Detox | Total |
|------|-------|-----------|-------|
| 2023 | few | many | ~50 |
| 2024 | ~60 | ~130 | ~190 |
| 2025 | 76 | 135 | 211 |
| 2026 | 40 | 0 | 40 |

---

## Commits Made

1. `baf4c14` - Add upload dates to video cards with redesigned layout
2. `989369e` - Fix video type filter not applying selected value
3. `c809d83` - Fix broken video title: rename to 'Marpe Guest Workshop'
4. `8bcb87c` - Remove 2 non-detox videos (later restored)
5. `56565e7` - Remove video: Breaking Fasting Rules (later restored)
6. `ed490f2` - Mark 10 off-season detox videos as archived
7. `cb61901` - Restore 3 deleted videos as archived
8. `672ceea` - Sort videos by uploadDate instead of index
9. `7a6b3ca` - Restore Featured badge for pinned video

---

## Next Steps

- Monitor for any other videos with incorrect categorization
- Consider adding search by date range
- Watch for Facebook CDN thumbnail URL expiration
