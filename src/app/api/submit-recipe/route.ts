import { NextRequest, NextResponse } from 'next/server';
import { createRecipeSubmission } from '@/lib/recipes';
import type { SubmitRecipeResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<SubmitRecipeResponse>> {
  try {
    const formData = await request.formData();
    const submitterName = formData.get('submitterName') as string;
    const recipeName = formData.get('recipeName') as string;
    const ingredients = formData.get('ingredients') as string;
    const instructions = formData.get('instructions') as string;
    const image = formData.get('image') as File | null;

    if (!submitterName?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Submitter name is required' },
        { status: 400 }
      );
    }

    if (!recipeName?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Recipe name is required' },
        { status: 400 }
      );
    }

    if (!ingredients?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Ingredients are required' },
        { status: 400 }
      );
    }

    if (!instructions?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Instructions are required' },
        { status: 400 }
      );
    }

    // Create the recipe in Supabase
    const recipeId = await createRecipeSubmission({
      submitterName: submitterName.trim(),
      recipeName: recipeName.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
      imageName: image ? image.name : undefined,
    });

    // Log the submission (for monitoring)
    console.log(`New recipe submission: "${recipeName}" by ${submitterName} (ID: ${recipeId})`);
    if (image) {
      console.log(`Image attached: ${image.name} (${image.size} bytes)`);
    }

    return NextResponse.json({
      success: true,
      message: 'Recipe submitted successfully! It will be reviewed before being published.',
      recipeId,
    });
  } catch (error) {
    console.error('Error submitting recipe:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit recipe. Please try again later.',
      },
      { status: 500 }
    );
  }
}
