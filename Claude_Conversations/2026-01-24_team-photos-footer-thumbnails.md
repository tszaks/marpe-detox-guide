# 2026-01-24 - Team Photos, Footer Update, Thumbnail Fix

## Date
January 24, 2026

## Changes Made

### 1. Added Team Photos
- Copied Whitney's headshot to `public/team/whitney.webp`
- Copied Mandi's headshot to `public/team/mandi.webp`
- Source files from `~/Downloads/`

### 2. Updated Footer Copyright
- Changed from dynamic year + "Marpe Nutrition" to hardcoded "© 2026 Marpe Nutrition LLC. All rights reserved."
- File: `src/components/layout/Footer.tsx`

### 3. Fixed Video Thumbnail Cropping
- Problem: People's heads were being cut off in video thumbnails
- Root cause: Default `object-position: center 25%` wasn't enough for portrait (9:16) Facebook Reel thumbnails displayed in landscape (16:9) containers
- Fix: Changed default to `object-top` so images anchor to the top and crop from the bottom
- File: `src/components/videos/VideoCard.tsx`
- Note: Individual videos can still override via `thumbnailObjectPosition` field

## Files Modified
- `src/components/layout/Footer.tsx`
- `src/components/videos/VideoCard.tsx`
- `public/team/whitney.webp` (new)
- `public/team/mandi.webp` (new)

## Commit
`8c47855` - Pushed to `main`

## Next Steps
- Team photos are in the project but not yet displayed on any page
- Could create an About/Team section to showcase Whitney and Mandi
