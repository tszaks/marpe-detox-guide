import {
  Hero,
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
      <Hero />
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
