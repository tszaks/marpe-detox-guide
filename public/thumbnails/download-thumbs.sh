#!/bin/bash
cd /Users/tyler/Projects/marpe-detox-guide/public/thumbnails

while IFS= read -r url; do
  if [ -n "$url" ]; then
    reel_id=$(echo "$url" | grep -oE '[0-9]{10,}')
    if [ ! -f "${reel_id}.jpg" ]; then
      echo "Downloading: $reel_id"
      yt-dlp --write-thumbnail --skip-download --convert-thumbnails jpg -o "$reel_id" "$url" 2>/dev/null
    else
      echo "Already have: $reel_id"
    fi
  fi
done < /Users/tyler/Downloads/FacebookReels/fb_links.txt

echo "Done! Total thumbnails:"
ls *.jpg 2>/dev/null | wc -l
