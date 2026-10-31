export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';

export type Category = 
  | 'Semua Resep'
  | 'Makanan Utama'
  | 'Sarapan'
  | 'Makanan Tradisional'
  | 'Camilan'
  | 'Dessert'
  | 'Minuman'
  | 'Makanan Sehat'
  | 'Seafood';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface CookingStep {
  step: number;
  instruction: string;
  durationMinutes?: number;
}

export interface Recipe {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  cuisine: 'Indonesian' | 'International';
  image: string;
  cookingTime: number; // in minutes
  prepTime: number; // in minutes
  difficulty: Difficulty;
  servings: number;
  ingredients: Ingredient[];
  instructions: CookingStep[];
  estimatedCalories: number; // kcal per serving
  cookingTips: string[];
  ingredientAlternatives?: string[];
  tags: string[];
  isPopular?: boolean;
}

export interface AttachmentInfo {
  name: string;
  type: 'image' | 'audio' | 'document';
  mimeType: string;
  previewUrl?: string; // object URL for images
  size: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedRecipes?: Recipe[];
  attachment?: AttachmentInfo;
}
