import { CollapsibleSection } from '@/components/ui';

const supportCategories = [
  {
    title: 'Rest & Relaxation',
    items: [
      'Get plenty of rest!',
      'Get therapeutic massage',
      'Practice deep breathing',
      'Do yoga',
      'Make time for prayer',
    ],
  },
  {
    title: 'Body Care & Therapies',
    items: [
      'Take Epsom salt baths',
      'Try oil pulling',
      'Practice dry skin brushing',
      'Exercise to promote sweating',
      'Use a sauna',
      'Use an ionic foot bath',
    ],
  },
  {
    title: 'Internal & Respiratory Support',
    items: [
      'Use apple cider vinegar',
      'Use a neti pot',
      'Try Navage nasal care',
      'Consider colonics/enemas',
    ],
  },
  {
    title: 'Healthy Environment',
    items: [
      'Add indoor plants',
      'Eliminate toxic household products',
      'Utilize an air purifier',
      'Use water filtration',
    ],
  },
];

export function SupportSuggestions() {
  return (
    <section className="bg-[var(--muted)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Ways to Support Your Detox
          </h2>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Simple habits that help your body heal faster
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto items-start">
          {supportCategories.map((category) => (
            <CollapsibleSection
              key={category.title}
              title={category.title}
              defaultOpen={category.title === 'Rest & Relaxation'}
            >
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[var(--brand-primary)] flex-shrink-0 mt-0.5">•</span>
                    <span className="text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </section>
  );
}
