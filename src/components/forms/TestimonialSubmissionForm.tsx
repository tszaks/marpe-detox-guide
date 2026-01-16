'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button, Callout } from '@/components/ui';

interface FormData {
  name: string;
  initials: string;
  quote: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  initials?: string;
  quote?: string;
  consent?: string;
}

export function TestimonialSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    initials: '',
    quote: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-generate initials from name
  const generateInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.initials.trim()) {
      newErrors.initials = 'Please enter your initials';
    } else if (formData.initials.length > 3) {
      newErrors.initials = 'Initials should be 1-3 characters';
    }

    if (!formData.quote.trim()) {
      newErrors.quote = 'Please share your testimonial';
    } else if (formData.quote.trim().length < 20) {
      newErrors.quote = 'Please write at least a few sentences';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm your consent to share your testimonial';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          initials: formData.initials.trim().toUpperCase(),
          quote: formData.quote.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        initials: '',
        quote: '',
        consent: false,
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate initials when name changes
    if (name === 'name') {
      const initials = generateInitials(value);
      if (initials) {
        setFormData((prev) => ({ ...prev, initials }));
      }
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-[var(--brand-accent)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          Thank You for Sharing!
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
          Your testimonial has been submitted for review. Once approved, it will appear on our testimonials page.
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>Submit Another Testimonial</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'error' && (
        <Callout variant="warning" title="Submission Error">
          {errorMessage}
        </Callout>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          Your full name (only initials will be displayed publicly)
        </p>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          className={`w-full rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Initials */}
      <div>
        <label
          htmlFor="initials"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Display Initials <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          How you want to be identified (e.g., JD, KS)
        </p>
        <input
          type="text"
          id="initials"
          name="initials"
          value={formData.initials}
          onChange={handleChange}
          placeholder="JD"
          maxLength={3}
          className={`w-full rounded-lg border ${
            errors.initials ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20 uppercase`}
        />
        {errors.initials && (
          <p className="mt-1 text-sm text-red-500">{errors.initials}</p>
        )}
      </div>

      {/* Testimonial */}
      <div>
        <label
          htmlFor="quote"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Your Testimonial <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          Share your experience with the detox program
        </p>
        <textarea
          id="quote"
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          rows={6}
          placeholder="After completing the 28-day detox program, I noticed incredible changes in my energy levels, sleep quality, and overall well-being..."
          className={`w-full rounded-lg border ${
            errors.quote ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.quote && (
          <p className="mt-1 text-sm text-red-500">{errors.quote}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, consent: e.target.checked }));
              if (errors.consent) {
                setErrors((prev) => ({ ...prev, consent: undefined }));
              }
            }}
            className={`mt-1 h-5 w-5 rounded border-2 ${
              errors.consent ? 'border-red-500' : 'border-[var(--border)]'
            } text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] focus:ring-offset-0`}
          />
          <span className="text-sm text-[var(--muted-foreground)]">
            I consent to my testimonial being shared publicly on the website if approved.
            Only my initials ({formData.initials || 'e.g., JD'}) will be displayed, not my full name.
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-sm text-red-500">{errors.consent}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Testimonial'
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Your testimonial will be reviewed before being published. Thank you for sharing your story!
      </p>
    </form>
  );
}
