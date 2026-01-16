import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TestimonialCard } from '@/components/testimonials';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read success stories from our detox program participants.',
};

const quickWins = [
  {
    initials: 'C',
    quote: 'I feel great!',
  },
  {
    initials: 'C',
    quote: 'I would never have been able to do this before. Marpé Nutrition gave me the tools I need to be successful.',
  },
  {
    initials: 'C',
    quote: 'So happy to lose weight.',
  },
  {
    initials: 'C',
    quote: 'I am so enjoying these healthy foods.',
  },
  {
    initials: 'C',
    quote: 'Everything feels amazing! I am going to keep it going.',
  },
  {
    initials: 'C',
    quote: 'So thankful for healthy blood pressure levels.',
  },
  {
    initials: 'C',
    quote: 'My belt buckle is at its last hole.',
  },
  {
    initials: 'C',
    quote: 'Hormones feel balanced.',
  },
  {
    initials: 'C',
    quote: 'I lost 16 pounds in 4 weeks!',
  },
  {
    initials: 'C',
    quote: 'Love the detox food ideas on social media!',
  },
  {
    initials: 'C',
    quote: 'I love getting a full night’s sleep now.',
  },
];

const fullTestimonials = [
  {
    initials: 'DC',
    quote:
      'Before I came to see Luisa, I was so depleted! I just had my second baby and I feel like I had aged 30 years! I was so thankful that the baby was sleeping, so I knew it wasn\'t sleep deprivation. My joints hurt, I had zero energy and was totally exhausted! I thought it was food related and I tried to eat better, but nothing helped. Just one week after my appointment with Luisa, I was so much better. I just finished the 28-day detox program and I feel fantastic. No pain, my joints feel good and my energy is great.',
  },
  {
    initials: 'DO',
    quote:
      'I just finished the 28-day detox program and what a difference! I have more energy and I am resting better. My skin is good, my blood pressure is normal, and my weight is down. No more brain fog or food cravings. I am looking forward to impressing my heart doctor with the good news next week!',
  },
  {
    initials: 'CB',
    quote:
      'Now that I finished the 28 day detox, I have no more bloating. Sleep is great. Skin is clear. And the "menopause grump" is long gone! Today my heart and head are lighter. Thank you for that Luisa!!',
  },
  {
    initials: 'MI',
    quote:
      'Before coming to Marpé, I was constantly tired, often felt the "blues," and dealt with stomach issues like bloating and cramps. These problems had been part of my life for as long as I can remember, but the past four years were the hardest. I tried everything—exercising, experimenting with different diets, and taking various supplements I found online—but nothing worked. After starting with Marpé, I began feeling better within the first month! I now wake up feeling refreshed and excited to take on the day. It\'s as if I\'ve become a completely new person. I just finished the 28-Day detox, and I\'ve lost 24 pounds, gone down two dress sizes, and for the first time, I enjoyed shopping for new clothes! The knowledge I gained about which products to buy and the best foods for my body has been invaluable. I now feel empowered to make healthier choices not just for myself but for my entire family. This journey has been truly life-changing, and I\'m so blessed that the Lord brought Luisa into my life. Thank you, and God bless!',
  },
  {
    initials: 'CT',
    quote:
      'Before coming to Marpé Nutrition, I thought that I would never be well again. I suffered from an immune deficiency for which there is no cure. On top of that Covid nearly did me in. Traditional medicine couldn\'t help me since there were no medicines or protocols for my condition. It became a matter of treating symptoms, but nothing more. I was skeptical that anything could be done to help my extreme fatigue, inability to sleep and frequent infections. I couldn\'t have imagined the impact of great nutrition. As a result of Marpé and the 28-day detox program, I feel better than I have in years. Extreme fatigue is no longer an issue. I take rigorous walks every day. I sleep better for the first time in many years of sleepiness. I also lost 12 pounds. It is rare that I have an infection compared to what I used to have. I am so thankful that God\'s food makes such a difference.',
  },
  {
    initials: 'MT',
    quote:
      'Before coming to Marpé Nutrition I had completely lost any hope of getting better. My stomach was always in pain, and I had tried lots of western and eastern medicines for treatments. I ate the best I could eat and yet nothing helped. Once I met Luisa I felt results within 2 weeks and what a relief! I recently finished the 28-day detox program and I feel wonderful. I am so grateful and very impressed at Luisa\'s knowledge, love, and care to get me better. Thank you!',
  },
  {
    initials: 'MM',
    quote:
      'When I first chatted with Luisa about nutrition, I just had breast cancer surgery. I was so thankful that the doctors said all was well, but I was very confused about what foods to eat for my long-term health. I didn\'t know what foods were best for my body. I did so much research on my own and I had heard so many conflicting opinions. It was overwhelming. Once I had my first appointment at Marpé Nutrition, I instantly felt better. My stress was instantly relieved once I had a direction on how to regain my strength and rebuild my health. I recently started the 28 day detox program and I feel marvelous. I am eating well. I have direction on what my body needs to thrive. I have confidence in my long-term health. I am so thankful!',
  },
  {
    initials: 'EL',
    quote:
      'I battled skin disease for many years. I had been to a dermatologist who gave topical steroid creams which did not help. They wanted to put me on steroid injections, but I declined. Once I met with Luisa, I started to notice changes with the supplements along with the new diet and lifestyle. Once I did the 28 day detox program, there was a big difference to my skin. It\'s been 4 months and it feels so much better! I love the way Marpé Nutrition works at getting to the root of the issue. Thank you, Luisa, for your knowledge and expertise and your recognition that God is our healer.',
  },
  {
    initials: 'TK',
    quote:
      'Before starting this journey, I felt completely worn down—overweight, sluggish, and out of breath even with minimal effort. My mind was clouded with "brain fog," and I often dealt with aches and pains. I knew something needed to change, so I began removing unhealthy foods from my diet and incorporating whole-food-based supplements to address these issues. Within just a few weeks, I started noticing positive changes. The brain fog lifted, my aches and pains diminished, and I felt stronger and more energized. I even gained stamina during workouts, which was a game-changer for me. After completing the 28-day detox program, I lost about 30 pounds! I look better, feel amazing, and no longer crave the unhealthy foods I once loved. This has been a transformative experience for my health and well-being.',
  },
  {
    initials: 'ED',
    quote:
      'I was alone trying to fix several issues with supplements. There was no way for me to have a unified approval. With Luisa’s help, I can make real progress and get great feed back along the way. I was very leery of the 28 day cleanse at first, but I see how easy it is and I love it. I have lost 30 pounds, but more importantly, I am on the way to feeling better. This has been a fascinating process!',
  },
  {
    initials: 'LL',
    quote:
      'For years, I struggled with GI issues, anxiety, and post-menopausal imbalance. Under the guidance of a clinical nutritionist and my DO, I tried bio-similar HRT, acid-reducing medications, and various natural therapies. While some of these approaches reduced my symptoms, they didn\'t address the root cause of my health issues, leaving me feeling uncertain about my healing journey. That all changed when a couple of my closest friends introduced me to Luisa. From the moment I began working with her, everything started to shift. After completing the 28-day detox under Luisa\'s care, I experienced remarkable improvements. My acid reflux eased, the night sweats disappeared, my sleep improved, and my cravings for sweets nearly vanished. On top of that, I started losing weight! I feel so blessed to have such incredible friends who introduced me to Luisa, and even more fortunate to now call her a friend too. She has truly been a transformative part of my journey to better health.',
  },
  {
    initials: 'KD',
    quote:
      'My pants fit again, my skin feels soft, and my body no longer aches. After years of feeling worn down and in pain, I finally feel like myself again. This truly feels like a miracle.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-[var(--muted)] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Client Testimonials
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Real stories from real people who have transformed their health with our detox program.
          </p>
        </div>

        {/* Quick Wins Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
            Quick Wins
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-8">
            Short and sweet results from our community
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickWins.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initials={testimonial.initials}
                quote={testimonial.quote}
                isQuickWin
              />
            ))}
          </div>
        </section>

        {/* Full Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
            Full Stories
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-8">
            Detailed experiences from program participants
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {fullTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initials={testimonial.initials}
                quote={testimonial.quote}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-xl mx-auto">
            Join hundreds of others who have transformed their health with our detox program.
            Book a consultation to get started.
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
