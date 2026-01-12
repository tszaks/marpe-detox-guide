'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button, Callout } from '@/components/ui';

interface FormData {
  submitterName: string;
  recipeName: string;
  ingredients: string;
  instructions: string;
  image: File | null;
}

interface FormErrors {
  submitterName?: string;
  recipeName?: string;
  ingredients?: string;
  instructions?: string;
  image?: string;
}

export function RecipeSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    submitterName: '',
    recipeName: '',
    ingredients: '',
    instructions: '',
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.submitterName.trim()) {
      newErrors.submitterName = 'Please enter your name';
    }

    if (!formData.recipeName.trim()) {
      newErrors.recipeName = 'Please enter a recipe name';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Please list the ingredients';
    } else if (formData.ingredients.trim().split('\n').filter((l) => l.trim()).length < 2) {
      newErrors.ingredients = 'Please list at least 2 ingredients';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Please provide instructions';
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
      const data = new FormData();
      data.append('submitterName', formData.submitterName);
      data.append('recipeName', formData.recipeName);
      data.append('ingredients', formData.ingredients);
      data.append('instructions', formData.instructions);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await fetch('/api/submit-recipe', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      setFormData({
        submitterName: '',
        recipeName: '',
        ingredients: '',
        instructions: '',
        image: null,
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors((prev) => ({ ...prev, image: 'File size must be less than 5MB' }));
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-[var(--brand-accent)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          Recipe Submitted Successfully!
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
          Thank you for sharing your recipe! It&apos;s been submitted for review and will appear
          on the site once approved.
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>Submit Another Recipe</Button>
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

      {/* Submitter Name */}
      <div>
        <label
          htmlFor="submitterName"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="submitterName"
          name="submitterName"
          value={formData.submitterName}
          onChange={handleChange}
          placeholder="Jane Doe"
          className={`w-full rounded-lg border ${
            errors.submitterName ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.submitterName && (
          <p className="mt-1 text-sm text-red-500">{errors.submitterName}</p>
        )}
      </div>

      {/* Recipe Name */}
      <div>
        <label
          htmlFor="recipeName"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Recipe Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          value={formData.recipeName}
          onChange={handleChange}
          placeholder="Delicious Green Smoothie"
          className={`w-full rounded-lg border ${
            errors.recipeName ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.recipeName && (
          <p className="mt-1 text-sm text-red-500">{errors.recipeName}</p>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Ingredients <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          List each ingredient on a new line
        </p>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows={6}
          placeholder="1 cup spinach
1 banana
1/2 cup almond milk
1 tbsp chia seeds"
          className={`w-full rounded-lg border ${
            errors.ingredients ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.ingredients && (
          <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
        )}
      </div>

      {/* Instructions */}
      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Instructions <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-[var(--muted-foreground)] mb-2">
          Describe the steps to make your recipe
        </p>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows={8}
          placeholder="1. Add all ingredients to a blender
2. Blend until smooth
3. Pour into a glass and enjoy!"
          className={`w-full rounded-lg border ${
            errors.instructions ? 'border-red-500' : 'border-[var(--border)]'
          } bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20`}
        />
        {errors.instructions && (
          <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-[var(--foreground)] mb-2"
        >
          Recipe Photo <span className="text-[var(--muted-foreground)] font-normal">(Optional)</span>
        </label>
        <div className="mt-1 flex justify-center rounded-lg border border-dashed border-[var(--border)] px-6 py-10 bg-[var(--accent-cool)]/30 hover:bg-[var(--accent-cool)]/50 transition-colors">
          <div className="text-center">
            {formData.image ? (
              <div className="relative">
                 <p className="text-sm text-[var(--brand-primary)] font-medium">
                  {formData.image.name}
                 </p>
                 <button
                   type="button"
                   onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                   className="mt-2 text-xs text-red-500 hover:text-red-700"
                 >
                   Remove
                 </button>
              </div>
            ) : (
              <>
                <div className="mx-auto h-12 w-12 text-[var(--muted-foreground)]">
                  <svg
                    className="h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mt-4 flex text-sm leading-6 text-[var(--muted-foreground)]">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md font-semibold text-[var(--brand-primary)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--brand-primary)] focus-within:ring-offset-2 hover:text-[var(--brand-accent)]"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-[var(--muted-foreground)]">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image}</p>
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
            'Submit Recipe'
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Your recipe will be reviewed before being published. Make sure all ingredients are
        detox-approved!
      </p>
    </form>
  );
}
