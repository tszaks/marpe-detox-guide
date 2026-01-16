import { supabase, isSupabaseConfigured } from './supabase';
import type { TestimonialSubmission } from '@/types';

/**
 * Create a new testimonial submission
 * Returns the testimonial ID (or a placeholder) on success
 */
export async function createTestimonialSubmission(
  submission: TestimonialSubmission
): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Testimonial submissions are temporarily unavailable.');
  }

  // Generate a unique ID using timestamp (for return value since we can't select back due to RLS)
  const submissionId = `testimonial-${Date.now()}`;

  // Note: We don't use .select('id') because RLS only allows SELECT on approved testimonials,
  // and newly inserted testimonials are pending. The insert will succeed but select would fail.
  const { error } = await supabase
    .from('testimonials')
    .insert({
      name: submission.name.trim(),
      initials: submission.initials.trim().toUpperCase(),
      quote: submission.quote.trim(),
      status: 'pending',
    });

  if (error) {
    console.error('Error creating testimonial:', error);
    // Provide more specific error messages
    if (error.code === '42501') {
      throw new Error('Permission denied. Please try again later.');
    }
    throw new Error(`Failed to submit testimonial: ${error.message}`);
  }

  return submissionId;
}
