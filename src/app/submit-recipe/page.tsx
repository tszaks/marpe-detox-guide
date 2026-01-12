import type { Metadata } from 'next';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { RecipeSubmissionForm } from '@/components/forms';
import { Callout } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Submit a Recipe',
  description: 'Share your favorite detox-approved recipe with our community.',
};

export default function SubmitRecipePage() {
  return (
    <div className="bg-[var(--muted)] min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-cool)] mb-4">
            <ChefHat className="h-8 w-8 text-[var(--brand-primary)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Submit Your Recipe</h1>
          <p className="mt-4 text-[var(--muted-foreground)]">
            Share your favorite detox-approved recipes with our community! All submissions are
            reviewed before being published.
          </p>
        </div>

        {/* Guidelines */}
        <Callout variant="info" title="Recipe Guidelines" className="mb-8">
          <ul className="space-y-1 mt-2">
            <li>• All ingredients must be detox-approved (check the{' '}
              <Link href="/#approved-foods" className="underline hover:text-blue-800">
                approved foods list
              </Link>
              )
            </li>
            <li>• Include specific measurements when possible</li>
            <li>• Write clear, step-by-step instructions</li>
            <li>• Recipes are reviewed within 24-48 hours</li>
          </ul>
        </Callout>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <RecipeSubmissionForm />
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/recipes"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] transition-colors"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
