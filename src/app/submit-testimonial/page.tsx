import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { TestimonialSubmissionForm } from '@/components/forms';
import { Callout } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Share Your Story',
  description: 'Share your detox success story and inspire others on their health journey.',
};

export default function SubmitTestimonialPage() {
  return (
    <div className="bg-[var(--muted)] min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 mb-4">
            <Heart className="h-8 w-8 text-[var(--brand-accent)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Share Your Story</h1>
          <p className="mt-4 text-[var(--muted-foreground)]">
            Your experience can inspire others! Share how the detox program has helped you.
            All testimonials are reviewed before being published.
          </p>
        </div>

        {/* Privacy note */}
        <Callout variant="info" title="Privacy Note" className="mb-8">
          <p className="mt-2">
            Your full name is collected for our records only. On the website, we display
            <strong> only your initials</strong> to protect your privacy.
          </p>
        </Callout>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <TestimonialSubmissionForm />
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/testimonials"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] transition-colors"
          >
            &larr; Back to Testimonials
          </Link>
        </div>
      </div>
    </div>
  );
}
