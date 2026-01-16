import { Video } from '@/types';

// Helper to extract reel ID from Facebook URL and generate thumbnail path
function getThumbnailUrl(facebookUrl: string): string {
  const reelId = facebookUrl.match(/\/reel\/(\d+)/)?.[1];
  return reelId ? `/thumbnails/${reelId}.jpg` : '';
}

// Raw video data without thumbnails (added automatically below)
const RAW_VIDEOS: Omit<Video, 'thumbnailUrl'>[] = [
  // Pre-Detox & Promo Videos
  {
    id: 'fb-1',
    title: 'Join Us for Our 2026 Marpe Detox Program',
    duration: '0:30',
    facebookUrl: 'https://www.facebook.com/reel/25579492188408689/',
    category: 'Daily Update',
    index: 1,
  },
  {
    id: 'fb-2',
    title: 'Pre-Detox Prep: Veggie Sticks and Hummus',
    duration: '0:45',
    facebookUrl: 'https://www.facebook.com/reel/1160000329535879/',
    category: 'Prep',
    index: 2,
  },
  {
    id: 'fb-3',
    title: 'Detox Helps Keep Your Immunity Strong This Winter',
    duration: '0:40',
    facebookUrl: 'https://www.facebook.com/reel/1257753239467082/',
    category: 'Tip',
    index: 3,
  },
  {
    id: 'fb-4',
    title: 'Looking for Energy? Join Our Detox Program',
    duration: '0:35',
    facebookUrl: 'https://www.facebook.com/reel/824874700596867/',
    category: 'Tip',
    index: 4,
  },
  {
    id: 'fb-5',
    title: 'Detox Helps Balance Hormones in 2026',
    duration: '0:38',
    facebookUrl: 'https://www.facebook.com/reel/2041384500047159/',
    category: 'Tip',
    index: 5,
  },
  {
    id: 'fb-6',
    title: 'Detox Starts Tomorrow - Are You Prepped?',
    duration: '0:32',
    facebookUrl: 'https://www.facebook.com/reel/1887671861846043/',
    category: 'Prep',
    index: 6,
  },

  // Day 1
  {
    id: 'fb-7',
    title: 'Day 1 of Detox: What Is Detox All About?',
    duration: '0:46',
    facebookUrl: 'https://www.facebook.com/reel/906746685024131/',
    category: 'Daily Update',
    day: 1,
    index: 7,
  },
  {
    id: 'fb-8',
    title: 'Day 1 of Detox: Did You Cut Back on Caffeine?',
    duration: '0:38',
    facebookUrl: 'https://www.facebook.com/reel/876566651965478/',
    category: 'Daily Update',
    day: 1,
    index: 8,
  },
  {
    id: 'fb-9',
    title: 'Day 1 of Detox: True Food Kitchen Dinner',
    duration: '0:23',
    facebookUrl: 'https://www.facebook.com/reel/1406350287879530/',
    category: 'Daily Update',
    day: 1,
    index: 9,
  },

  // Day 2
  {
    id: 'fb-10',
    title: 'Day 2 of Detox: Check Out the Detox Site',
    duration: '0:57',
    facebookUrl: 'https://www.facebook.com/reel/877163595010262/',
    category: 'Daily Update',
    day: 2,
    index: 10,
  },
  {
    id: 'fb-11',
    title: 'Day 2 of Detox: Diet vs True Detox',
    duration: '0:56',
    facebookUrl: 'https://www.facebook.com/reel/1369548890986501/',
    category: 'Daily Update',
    day: 2,
    index: 11,
  },
  {
    id: 'fb-12',
    title: 'Day 2 of Detox: Whats in Your Lip Balm?',
    duration: '1:05',
    facebookUrl: 'https://www.facebook.com/reel/2060939074669210/',
    category: 'Tip',
    day: 2,
    index: 12,
  },

  // Day 3
  {
    id: 'fb-13',
    title: 'Day 3 of Detox: Try Zoodles for Spaghetti Cravings',
    duration: '1:44',
    facebookUrl: 'https://www.facebook.com/reel/2100430603826608/',
    category: 'Recipe',
    day: 3,
    index: 13,
  },
  {
    id: 'fb-14',
    title: 'Day 3 of Detox: Bring Your Salad to the Party',
    duration: '0:48',
    facebookUrl: 'https://www.facebook.com/reel/2005425073356338/',
    category: 'Daily Update',
    day: 3,
    index: 14,
  },
  {
    id: 'fb-15',
    title: 'Day 3 of Detox: Workouts Support Detox',
    duration: '0:42',
    facebookUrl: 'https://www.facebook.com/reel/2065029104220153/',
    category: 'Tip',
    day: 3,
    index: 15,
  },

  // Day 4
  {
    id: 'fb-16',
    title: 'Day 4 of Detox: Fresh Guacamole Recipe',
    duration: '1:19',
    facebookUrl: 'https://www.facebook.com/reel/2049314782575212/',
    category: 'Recipe',
    day: 4,
    index: 16,
  },
  {
    id: 'fb-17',
    title: 'Day 4 of Detox: Try Our Detox-Approved Cookies',
    duration: '0:47',
    facebookUrl: 'https://www.facebook.com/reel/1542163947006824/',
    category: 'Tip',
    day: 4,
    index: 17,
  },
  {
    id: 'fb-18',
    title: 'Day 4 of Detox: Kale Chips Are a Great Snack',
    duration: '1:00',
    facebookUrl: 'https://www.facebook.com/reel/2092961231464318/',
    category: 'Recipe',
    day: 4,
    index: 18,
  },

  // Day 5
  {
    id: 'fb-19',
    title: 'Day 5 of Detox: Creamy Broccoli Soup Recipe',
    duration: '0:53',
    facebookUrl: 'https://www.facebook.com/reel/1412284653876221/',
    category: 'Recipe',
    day: 5,
    index: 19,
  },
  {
    id: 'fb-20',
    title: 'Day 5 of Detox: Vegan Mexican Soup',
    duration: '1:13',
    facebookUrl: 'https://www.facebook.com/reel/2118166732324270/',
    category: 'Recipe',
    day: 5,
    index: 20,
  },

  // Day 6
  {
    id: 'fb-21',
    title: 'Day 6 of Detox: Fill Coconut Wraps with Anything',
    duration: '1:33',
    facebookUrl: 'https://www.facebook.com/reel/1226019143004779/',
    category: 'Recipe',
    day: 6,
    index: 21,
  },
  {
    id: 'fb-22',
    title: 'Day 6 of Detox: Fresh Coconuts from Costco',
    duration: '0:48',
    facebookUrl: 'https://www.facebook.com/reel/1421841126331809/',
    category: 'Tip',
    day: 6,
    index: 22,
  },

  // Bonus: Do You Need a Detox?
  {
    id: 'fb-23',
    title: 'Do YOU Need a Detox?',
    duration: '0:33',
    facebookUrl: 'https://www.facebook.com/reel/1225699539432441/',
    category: 'Tip',
    index: 23,
  },

  // Day 7
  {
    id: 'fb-24',
    title: 'Day 7 of Detox: Smoothie Options',
    duration: '0:47',
    facebookUrl: 'https://www.facebook.com/reel/817236634700268/',
    category: 'Recipe',
    day: 7,
    index: 24,
  },
  {
    id: 'fb-25',
    title: 'Day 7 of Detox: Detox-Approved French Fries',
    duration: '1:01',
    facebookUrl: 'https://www.facebook.com/reel/859332073364021/',
    category: 'Recipe',
    day: 7,
    index: 25,
  },
  {
    id: 'fb-26',
    title: 'Day 7 of Detox: If Bowels Arent Moving, Call for Help',
    duration: '0:45',
    facebookUrl: 'https://www.facebook.com/reel/1593938418616128/',
    category: 'Tip',
    day: 7,
    index: 26,
  },

  // Day 8
  {
    id: 'fb-27',
    title: 'Day 8 of Detox: Be Creative with Your Salads',
    duration: '0:57',
    facebookUrl: 'https://www.facebook.com/reel/1211515444249690/',
    category: 'Recipe',
    day: 8,
    index: 27,
  },
  {
    id: 'fb-28',
    title: 'Day 8 of Detox: Tea Is a Great Option',
    duration: '1:04',
    facebookUrl: 'https://www.facebook.com/reel/1190802573172152/',
    category: 'Tip',
    day: 8,
    index: 28,
  },

  // Day 9
  {
    id: 'fb-29',
    title: 'Day 9 of Detox: Sun-Dried Tomatoes Spice Up Any Meal',
    duration: '0:53',
    facebookUrl: 'https://www.facebook.com/reel/849786241201479/',
    category: 'Recipe',
    day: 9,
    index: 29,
  },
  {
    id: 'fb-30',
    title: 'Day 9 of Detox: Try Beef Tallow',
    duration: '1:15',
    facebookUrl: 'https://www.facebook.com/reel/901918982794904/',
    category: 'Tip',
    day: 9,
    index: 30,
  },

  // Day 10
  {
    id: 'fb-31',
    title: 'Day 10 of Detox: Stir-Fry On the Go',
    duration: '0:59',
    facebookUrl: 'https://www.facebook.com/reel/25345689725122525/',
    category: 'Recipe',
    day: 10,
    index: 31,
  },
  {
    id: 'fb-32',
    title: 'Day 10 of Detox: Epsom Salt Soaks',
    duration: '0:42',
    facebookUrl: 'https://www.facebook.com/reel/876087551494804/',
    category: 'Tip',
    day: 10,
    index: 32,
  },

  // Day 11
  {
    id: 'fb-33',
    title: 'Day 11 of Detox: Wash Your Veggies',
    duration: '0:35',
    facebookUrl: 'https://www.facebook.com/reel/2805155959846113/',
    category: 'Tip',
    day: 11,
    index: 33,
  },
  {
    id: 'fb-34',
    title: 'Day 11 of Detox: Its Meat Day!',
    duration: '0:26',
    facebookUrl: 'https://www.facebook.com/reel/1934138287496473/',
    category: 'Daily Update',
    day: 11,
    index: 34,
  },

  // Bonus
  {
    id: 'fb-35',
    title: 'Thats a DIET NOT A DETOX!',
    duration: '0:33',
    facebookUrl: 'https://www.facebook.com/reel/1553777609104910/',
    category: 'Tip',
    index: 35,
  },

  // Day 12
  {
    id: 'fb-36',
    title: 'Day 12 of Detox: Making Nourishing Bone Broth',
    duration: '2:15',
    facebookUrl: 'https://www.facebook.com/reel/1195386246129811/',
    category: 'Recipe',
    day: 12,
    index: 36,
  },
  {
    id: 'fb-37',
    title: 'Day 12 of Detox: Stir Fry Green Beans',
    duration: '1:20',
    facebookUrl: 'https://www.facebook.com/reel/1220040196204189/',
    category: 'Recipe',
    day: 12,
    index: 37,
  },

  // Day 13
  {
    id: 'fb-38',
    title: 'Day 13 of Detox: Healthy Taco Salad Recipe',
    duration: '1:35',
    facebookUrl: 'https://www.facebook.com/reel/743067518848717/',
    category: 'Recipe',
    day: 13,
    index: 38,
  },
  {
    id: 'fb-39',
    title: 'Day 13 of Detox: Easy Stir Fry Anyone Can Make',
    duration: '1:45',
    facebookUrl: 'https://www.facebook.com/reel/1646593066719698/',
    category: 'Recipe',
    day: 13,
    index: 39,
  },

  // Day 14
  {
    id: 'fb-40',
    title: 'Day 14 of Detox: Easy 3-Ingredient Chia Pudding',
    duration: '1:30',
    facebookUrl: 'https://www.facebook.com/reel/4397647950554426/',
    category: 'Recipe',
    day: 14,
    index: 40,
  },
  {
    id: 'fb-41',
    title: 'Day 14 of Detox: Simple Vegan Greek Salad',
    duration: '0:55',
    facebookUrl: 'https://www.facebook.com/reel/910144795018060/',
    category: 'Recipe',
    day: 14,
    index: 41,
  },

  // Bonus Testimonials & Tips
  {
    id: 'fb-42',
    title: 'From Painful Knees to Jumping Jacks',
    duration: '0:35',
    facebookUrl: 'https://www.facebook.com/reel/1400645988456516/',
    category: 'Tip',
    index: 42,
  },
  {
    id: 'fb-43',
    title: 'Vegan Rage: When Detox Gets Intense',
    duration: '1:00',
    facebookUrl: 'https://www.facebook.com/reel/34192764246977439/',
    category: 'Tip',
    index: 43,
  },

  // Bonus: No Bars
  {
    id: 'fb-44',
    title: 'No Bars! Real Food Over Processed Cleanses',
    duration: '0:55',
    facebookUrl: 'https://www.facebook.com/reel/4240951989517168/',
    category: 'Tip',
    index: 44,
  },

  // Day 15
  {
    id: 'fb-45',
    title: 'Day 15 of Detox: Apple Cider Vinegar for Bloating',
    duration: '1:20',
    facebookUrl: 'https://www.facebook.com/reel/902957805416029/',
    category: 'Tip',
    day: 15,
    index: 45,
  },
  {
    id: 'fb-46',
    title: 'Day 15 of Detox: Easy Frozen Cauliflower Soup',
    duration: '1:05',
    facebookUrl: 'https://www.facebook.com/reel/906379745404677/',
    category: 'Recipe',
    day: 15,
    index: 46,
  },
];

// Auto-generate thumbnail URLs from Facebook URLs
const VIDEOS_WITH_THUMBNAILS: Video[] = RAW_VIDEOS.map(video => ({
  ...video,
  thumbnailUrl: video.facebookUrl ? getThumbnailUrl(video.facebookUrl) : undefined,
}));

// Pinned video ID - this video always appears first
const PINNED_VIDEO_ID = 'fb-1';

// Number of videos to mark as "recent" (after the pinned video)
const RECENT_COUNT = 2;

export function getVideos(): Video[] {
  // Find the pinned video
  const pinnedVideo = VIDEOS_WITH_THUMBNAILS.find(v => v.id === PINNED_VIDEO_ID);

  // Get all other videos and sort by index descending (newest first)
  const otherVideos = VIDEOS_WITH_THUMBNAILS
    .filter(v => v.id !== PINNED_VIDEO_ID)
    .sort((a, b) => (b.index || 0) - (a.index || 0));

  // Mark the pinned video
  const result: Video[] = [];

  if (pinnedVideo) {
    result.push({ ...pinnedVideo, isPinned: true });
  }

  // Add other videos, marking the first RECENT_COUNT as recent
  otherVideos.forEach((video, idx) => {
    result.push({
      ...video,
      isRecent: idx < RECENT_COUNT,
    });
  });

  return result;
}

// Export raw sorted videos for backward compatibility
export const VIDEOS = getVideos();

export function getVideoCategories(): string[] {
  return ['All', 'Daily Update', 'Recipe', 'Tip', 'Workshop', 'Prep'];
}
