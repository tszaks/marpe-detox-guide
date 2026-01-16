import { NextRequest, NextResponse } from 'next/server';
import { createTestimonialSubmission } from '@/lib/testimonials';
import type { SubmitTestimonialResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<SubmitTestimonialResponse>> {
  try {
    const body = await request.json();
    const { name, initials, quote } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Your name is required' },
        { status: 400 }
      );
    }

    if (!initials?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Initials are required' },
        { status: 400 }
      );
    }

    if (initials.trim().length > 3) {
      return NextResponse.json(
        { success: false, message: 'Initials should be 1-3 characters' },
        { status: 400 }
      );
    }

    if (!quote?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Testimonial is required' },
        { status: 400 }
      );
    }

    if (quote.trim().length < 20) {
      return NextResponse.json(
        { success: false, message: 'Please write at least a few sentences for your testimonial' },
        { status: 400 }
      );
    }

    // Create the testimonial in Supabase
    const testimonialId = await createTestimonialSubmission({
      name: name.trim(),
      initials: initials.trim(),
      quote: quote.trim(),
    });

    // Log the submission (for monitoring)
    console.log(`New testimonial submission from "${initials}" (ID: ${testimonialId})`);

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully! It will be reviewed before being published.',
      testimonialId,
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again later.',
      },
      { status: 500 }
    );
  }
}
