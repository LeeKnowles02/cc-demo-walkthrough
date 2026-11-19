import { Injectable, signal } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient';

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
