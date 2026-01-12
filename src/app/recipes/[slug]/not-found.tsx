import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui';

export default function RecipeNotFound() {
  return (
    <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <ChefHat className="h-20 w-20 text-[var(--muted-foreground)] opacity-20" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Recipe Not Found</h1>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-md">
          We couldn&apos;t find the recipe you&apos;re looking for. It may have been removed or the
          link might be incorrect.
        </p>
        <Link href="/recipes">
          <Button>Browse All Recipes</Button>
        </Link>
      </div>
    </div>
  );
}
