import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CollapsibleSection } from '@/components/ui';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about the Marpé Nutrition Detox program.',
};

const faqCategories = [
  {
    category: 'About the Detox',
    questions: [
      {
        question: 'What is the Marpé Nutrition Detox?',
        answer:
          'The Marpé Nutrition Detox is a whole-food–based reset designed to reduce dietary stress, support digestion, and help your body function more efficiently. It focuses on clean foods, simple routines, and education so you can carry these habits forward.',
      },
      {
        question: 'Who is this detox for?',
        answer:
          'This detox is ideal for adults looking to reset eating habits, improve energy, reduce cravings, or refocus on nourishing foods. It is especially helpful for those who want guidance rather than guessing what their body needs.',
      },
      {
        question: 'Is this a juice cleanse?',
        answer:
          'No. This is not a juice cleanse or a starvation plan. You will eat real, nourishing foods that support your body while giving it a break from common irritants.',
      },
      {
        question: 'How long is the detox?',
        answer:
          'The core detox runs for 28 days, with structured phases and weekly guidance throughout.',
      },
    ],
  },
  {
    category: 'Appointments & Support',
    questions: [
      {
        question: 'Do I need to come in for visits during detox?',
        answer:
          'Yes. Detox participants are required to come in for weekly visits. These visits allow us to assess how your body is responding and determine which supports are needed at each stage of the detox.',
      },
      {
        question: 'Why are weekly visits important?',
        answer:
          'Your body's needs change throughout the detox. Weekly visits allow us to make adjustments, provide guidance, and ensure your detox organs are being supported appropriately as your system responds.',
      },
      {
        question: 'What support is available during detox?',
        answer:
          'Support includes weekly visits, educational videos, recipes, and ongoing guidance from our team.',
      },
    ],
  },
  {
    category: 'Supplements',
    questions: [
      {
        question: 'Are supplements required?',
        answer:
          'Yes. Supplements are used strategically during detox to support specific functions in the body. Each supplement has a purpose and is selected based on how your body responds week to week.',
      },
      {
        question: 'Will my supplements change during detox?',
        answer:
          'Yes. Supplements often change from week to week. This is intentional and reflects what your body needs at each phase of the detox process.',
      },
      {
        question: 'How do supplements support detox?',
        answer:
          'Supplements are used to support organs involved in detoxification and elimination so the body can process and clear what it is ready to handle. This support is what differentiates a guided detox from simply changing food choices.',
      },
      {
        question: 'Is following the food list alone considered a detox?',
        answer:
          'No. Following the food protocol without proper support from our office is considered a diet, not a detox. A true detox requires targeted supplement support to encourage the body's detox organs to perform efficiently.',
      },
    ],
  },
  {
    category: 'Food & Eating',
    questions: [
      {
        question: 'What foods will I be eating?',
        answer:
          'You will focus on whole, simple foods including vegetables, approved fruits, healthy fats, and clean protein sources as introduced during the program. Recipes and meal ideas are provided throughout the detox.',
      },
      {
        question: 'What foods are removed during detox?',
        answer:
          'The detox removes foods that commonly stress the body, such as sugar, processed foods, caffeine, alcohol, and certain inflammatory ingredients. This gives your system a chance to reset and respond more clearly.',
      },
      {
        question: 'Will I feel hungry?',
        answer:
          'Most people are surprised by how satisfied they feel when eating nourishing foods consistently. Hunger often improves as blood sugar stabilizes and cravings decrease.',
      },
      {
        question: 'Do you provide recipes?',
        answer:
          'Yes. The website includes approved recipes, and new recipes are added regularly.',
      },
      {
        question: 'Can I submit a recipe?',
        answer:
          'Yes. We love featuring recipes from our community. Tried-and-true detox-friendly recipes can be submitted directly on the website.',
      },
      {
        question: 'What if I have food sensitivities or special dietary needs?',
        answer:
          'Adjustments can often be made. Detox is about supporting your body, not forcing a rigid plan.',
      },
    ],
  },
  {
    category: 'Daily Life & Activity',
    questions: [
      {
        question: 'What if I feel tired or off at the beginning?',
        answer:
          'Some people experience temporary adjustments as the body shifts. Weekly visits help us support you through these changes and make necessary adjustments.',
      },
      {
        question: 'Can I exercise during detox?',
        answer:
          'Yes, but movement should be supportive rather than intense. Walking, stretching, and light workouts are encouraged, especially during the first week, as the body is adjusting.',
      },
      {
        question: 'Can I work and live normally during detox?',
        answer:
          'Yes. The detox is designed to fit into real life, including work and family schedules. Planning ahead makes the process smoother and more sustainable.',
      },
    ],
  },
  {
    category: 'Results & After',
    questions: [
      {
        question: 'What happens after detox ends?',
        answer:
          'You will learn how to reintroduce foods intentionally and identify what works best for your body moving forward.',
      },
      {
        question: 'Will this help with weight?',
        answer:
          'Weight changes often occur, but the primary focus is improving how the body functions. When the body is supported, changes tend to follow naturally.',
      },
    ],
  },
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I get started?',
        answer:
          'Choose your detox start date, review the preparation materials, and schedule your weekly visits.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-[var(--muted)] min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Everything you need to know about the Marpé Nutrition Detox program.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <CollapsibleSection
                    key={questionIndex}
                    title={faq.question}
                    defaultOpen={false}
                  >
                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </CollapsibleSection>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <section className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-xl mx-auto">
            We're here to help! Book a consultation to discuss your specific needs and get personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/recipes">
              <Button variant="outline" size="lg">
                Browse Recipes
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
