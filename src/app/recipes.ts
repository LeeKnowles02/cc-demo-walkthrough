import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPES, ShoppingList } from './data';

@Component({
  selector: 'app-recipes',
  template: `
    <main class="page">
      <div class="page-title">
        <h1>Recipes</h1>
        <span class="chip">{{ recipes.length }}</span>
      </div>

      <div class="layout">
        <section>
          <span class="section-label">All recipes</span>
          <div class="list">
            @for (r of recipes; track r.name; let i = $index) {
              <button
                type="button"
                class="recipe"
                [class.active]="i === selected()"
                (click)="selected.set(i)"
              >
                <strong>{{ r.name }}</strong>
                <span class="muted">{{ r.description }}</span>
                <span class="tags">
                  <span class="badge">{{ r.time }}</span>
                  <span class="badge badge-outline">{{ r.serves }}</span>
                </span>
              </button>
            }
          </div>
        </section>

        <section>
          <span class="section-label">Details</span>
          <div class="card details">
            <div>
              <h2>{{ recipe().name }}</h2>
              <p class="muted">{{ recipe().description }}</p>
              <span class="tags">
                <span class="badge">{{ recipe().time }}</span>
                <span class="badge badge-outline">{{ recipe().serves }}</span>
              </span>
            </div>
            <hr />
            <div>
              <span class="section-label">Ingredients</span>
              <ul>
                @for (ing of recipe().ingredients; track ing.name) {
                  <li>
                    <span>{{ ing.name }}</span>
                    <span class="muted">{{ ing.amount }}</span>
                  </li>
                }
              </ul>
            </div>
            <hr />
            <div class="actions">
              <button type="button" class="btn btn-primary" (click)="addToList()">
                Add to shopping list
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(0, 2fr);
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 4px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--card-radius);
    }
    .recipe {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 12px;
      border: none;
      border-radius: var(--radius);
      background: transparent;
      color: var(--foreground);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .recipe.active {
      background: var(--muted);
    }
    .tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    .recipe .tags {
      margin-top: 0;
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    hr {
      width: 100%;
      margin: 0;
      border: none;
      border-top: 1px solid var(--border);
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 8px 12px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
    }
  `,
})
export class Recipes {
  private shoppingList = inject(ShoppingList);
  private router = inject(Router);

  recipes = RECIPES;
  selected = signal(0);

  recipe() {
    return this.recipes[this.selected()];
  }

  addToList() {
    this.shoppingList.addAll(this.recipe().ingredients);
    this.router.navigateByUrl('/shopping-list');
  }
}
