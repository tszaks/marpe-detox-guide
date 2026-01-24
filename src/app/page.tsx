import {
  HeroCarousel,
  Announcements,
  QuickLinks,
  FoodsToAvoid,
  ApprovedFoods,
  TipsAndReminders,
  SupportSuggestions,
  QuickWinsPreview,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Announcements />
      <QuickLinks />
      <FoodsToAvoid />
      <ApprovedFoods />
      <TipsAndReminders />
      <SupportSuggestions />
      <QuickWinsPreview />
    </>
  );
}
