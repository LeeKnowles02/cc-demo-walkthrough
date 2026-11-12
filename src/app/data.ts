import { Injectable, signal } from '@angular/core';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  name: string;
  description: string;
  time: string;
  serves: string;
  ingredients: Ingredient[];
}

// Static demo data. No API, no database.
export const RECIPES: Recipe[] = [
  {
    name: 'Spaghetti carbonara',
    description: 'Silky egg and pecorino sauce with crisp guanciale and plenty of black pepper.',
    time: '25 min',
    serves: 'Serves 4',
    ingredients: [
      { name: 'Spaghetti', amount: '400 g' },
      { name: 'Guanciale', amount: '150 g' },
      { name: 'Eggs', amount: '4' },
      { name: 'Pecorino Romano', amount: '60 g' },
      { name: 'Black pepper', amount: '1 tsp' },
    ],
  },
  {
    name: 'Chicken tikka masala',
    description: 'Charred, spiced chicken simmered in a creamy tomato sauce.',
    time: '50 min',
    serves: 'Serves 4',
    ingredients: [
      { name: 'Chicken thighs', amount: '700 g' },
      { name: 'Plain yogurt', amount: '200 g' },
      { name: 'Crushed tomatoes', amount: '400 g' },
      { name: 'Heavy cream', amount: '150 ml' },
      { name: 'Garam masala', amount: '2 tbsp' },
      { name: 'Onion', amount: '1' },
    ],
  },
  {
    name: 'Vegetable stir-fry',
    description: 'Crunchy vegetables tossed in a quick soy, ginger and garlic sauce.',
    time: '20 min',
    serves: 'Serves 2',
    ingredients: [
      { name: 'Broccoli', amount: '1 head' },
      { name: 'Red pepper', amount: '1' },
      { name: 'Snap peas', amount: '150 g' },
      { name: 'Soy sauce', amount: '3 tbsp' },
      { name: 'Fresh ginger', amount: '1 thumb' },
      { name: 'Garlic', amount: '2 cloves' },
    ],
  },
];

// Shopping list lives in memory only (resets on page refresh).
@Injectable({ providedIn: 'root' })
export class ShoppingList {
  items = signal<Ingredient[]>([
    { name: 'Spaghetti', amount: '400 g' },
    { name: 'Eggs', amount: '4' },
    { name: 'Pecorino Romano', amount: '60 g' },
    { name: 'Tomatoes', amount: '6' },
    { name: 'Apples', amount: '5' },
  ]);

  add(item: Ingredient) {
    this.items.update((list) => [...list, item]);
  }

  addAll(items: Ingredient[]) {
    this.items.update((list) => [...list, ...items]);
  }

  remove(index: number) {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }
}
