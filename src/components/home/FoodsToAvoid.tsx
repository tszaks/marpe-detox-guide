import { X } from 'lucide-react';

const foodsToAvoid = [
  { name: 'Dairy Products', note: 'Milk, Cream, Cheese' },
  { name: 'Almond Milk', note: null },
  { name: 'Caffeine', note: 'Coffee, Energy Drinks' },
  { name: 'Sugar', note: 'Yes, ALL Sugar' },
  { name: 'Grains', note: 'Bread, Quinoa, Cereals, Flours, Rice, Corn' },
  { name: 'Starches', note: 'Potatoes' },
  { name: 'Sweet Fruits', note: null },
  { name: 'Canned Foods', note: null },
  { name: 'Eggs', note: null },
  { name: 'Mushrooms', note: null },
  { name: 'Gum', note: null },
  { name: 'Pork Products', note: null },
  { name: 'Lentil and Chickpea Pastas', note: null },
  { name: 'Alcohol', note: null },
  { name: 'Nuts/Most Seeds', note: null },
];

export function FoodsToAvoid() {
  return (
    <section id="foods-to-avoid" className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Take a Break <span className="text-[var(--muted-foreground)]">From These</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto font-normal">
            Detox is about eating clean and resetting your body. Skip these so
            your system can focus on healing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foodsToAvoid.map((food) => (
              <div
                key={food.name}
                className="group flex items-center justify-between p-5 rounded-2xl bg-[var(--accent-cool)] border border-[var(--border)]/40 hover:border-[var(--brand-accent)]/20 hover:bg-white hover:shadow-apple transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--foreground)] tracking-tight">{food.name}</span>
                  {food.note && (
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 uppercase tracking-wider">{food.note}</span>
                  )}
                </div>
                <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[var(--muted-foreground)] opacity-20 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-3xl bg-[#f5f5f7] border border-[var(--border)]/30 flex items-start gap-5">
            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <X className="h-6 w-6 text-[var(--foreground)]" />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-[var(--foreground)] tracking-tight">Addressing the underlying cause</h4>
              <p className="text-[15px] text-[var(--muted-foreground)] mt-2 leading-relaxed">
                By eliminating these stressors, we remove the interference to your nervous system. This allows 
                for faster correction of nutritional deficiencies and supports the body&apos;s natural ability 
                to restore complete balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
