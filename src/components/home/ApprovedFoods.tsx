'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const approvedFoodsCategories = [
  {
    name: 'Vegetables',
    items: [
      'Leafy Greens: Arugula, Beet Greens, Collard Greens, Dandelion Greens, Kale, Lettuce, Spinach, Swiss Chard, Other Greens',
      'Cruciferous: Broccoli, Broccoli Rabe, Brussels Sprouts, Cabbage, Cauliflower',
      'Root: Beets, Carrots (except baby), Sweet Potatoes',
      'Squash: Butternut Squash, Spaghetti Squash, Zucchini',
      'Other: Artichokes, Asparagus, Bok Choy, Celery, Cucumbers, Eggplant, Bell Peppers, Tomatoes, Okra, Radishes',
      'Aromatics: Garlic, Onions, Leeks, Shallots, Chives, Ginger',
    ],
  },
  {
    name: 'Proteins',
    items: [
      'Meat (Starting Day 11): Steak, Beef, Chicken, Turkey',
      'Seafood (Starting Day 11)',
      'Plant-Based: Beans & Lentils',
      'Flaxseed',
    ],
  },
  {
    name: 'Healthy Fats',
    items: [
      'Oils: Avocado Oil, Coconut Oil, Extra-virgin Olive Oil, Grapeseed, Hemp, Sesame',
      'Other: Avocados, Coconut, Fish Oil, Flaxseed Oil, Organic Butter',
    ],
  },
  {
    name: 'Beverages',
    items: [
      'Teas',
      'Bone Broth',
    ],
  },
  {
    name: 'Fruits',
    items: [
      'Limited: Berries',
    ],
  },
];

export function ApprovedFoods() {
  const [activeCategory, setActiveCategory] = useState(approvedFoodsCategories[0].name);

  return (
    <section id="approved-foods" className="bg-[#fbfbfd] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Sustain. <span className="text-[var(--brand-accent)]">Nourish.</span> Heal.
          </h2>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto font-normal">
            These whole foods give your body the nutrients it needs to heal. Stick with these during your detox and feel the difference.
          </p>
        </div>

        {/* Category tabs - Apple style segmented control with horizontal scroll */}
        <div className="overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          <div className="flex p-1.5 bg-[var(--muted)] rounded-2xl mx-auto mb-12 border border-[var(--border)]/30 shadow-inner min-w-max w-fit">
            {approvedFoodsCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.name
                    ? 'bg-white text-[var(--foreground)] shadow-apple'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active category content */}
        <div className="max-w-4xl mx-auto min-h-[400px]">
          {approvedFoodsCategories.map(
            (category) =>
              category.name === activeCategory && (
                <div key={category.name} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-apple border border-[var(--border)]/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                       <Check className="h-40 w-40 text-[var(--brand-accent)]" />
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-[var(--foreground)] mb-8 tracking-tight flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                        {category.name}
                      </h3>
                      
                      <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
                        {category.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-4 py-3 border-b border-[var(--border)]/20 last:border-0 group"
                          >
                            <div className="h-6 w-6 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center text-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-[var(--foreground)] tracking-tight">
                              {item.includes(':') ? (
                                <>
                                  <span className="font-bold">{item.split(':')[0]}:</span>
                                  <span className="font-normal">{item.split(':').slice(1).join(':')}</span>
                                </>
                              ) : (
                                <span className="font-medium">{item}</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
