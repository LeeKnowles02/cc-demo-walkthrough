import { Component, inject, signal } from '@angular/core';
import { ShoppingList as ShoppingListService } from './data';

@Component({
  selector: 'app-shopping-list',
  template: `
    <main class="page narrow">
      <div class="page-title">
        <h1>Shopping list</h1>
        <span class="chip">{{ list.items().length }}</span>
      </div>

      <section>
        <span class="section-label">Add item</span>
        <form class="card form" (submit)="add($event)">
          <div class="fields">
            <div>
              <label class="label" for="item-name">Ingredient</label>
              <input
                class="input"
                id="item-name"
                placeholder="e.g. Tomatoes"
                [value]="name()"
                (input)="name.set($any($event.target).value)"
              />
            </div>
            <div>
              <label class="label" for="item-amount">Amount</label>
              <input
                class="input"
                id="item-amount"
                placeholder="1"
                [value]="amount()"
                (input)="amount.set($any($event.target).value)"
              />
            </div>
          </div>
          <div class="actions">
            <button type="button" class="btn btn-outline" (click)="clear()">Clear</button>
            <button type="submit" class="btn btn-primary">Add item</button>
          </div>
        </form>
      </section>

      <section>
        <span class="section-label">Items</span>
        <div class="card table">
          @for (item of list.items(); track $index) {
            <div class="row">
              <span class="item-name">{{ item.name }}</span>
              <span class="muted">{{ item.amount }}</span>
              <button
                type="button"
                class="btn btn-ghost"
                [attr.aria-label]="'Remove ' + item.name"
                (click)="list.remove($index)"
              >
                Remove
              </button>
            </div>
          } @empty {
            <p class="muted empty">Your shopping list is empty.</p>
          }
        </div>
      </section>
    </main>
  `,
  styles: `
    .narrow {
      max-width: 860px;
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .fields {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 16px;
    }
    @media (max-width: 600px) {
      .fields {
        grid-template-columns: 1fr;
      }
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .table {
      padding: 0;
      overflow: hidden;
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 120px auto;
      align-items: center;
      gap: 12px;
      padding: 4px 12px 4px 20px;
      border-top: 1px solid var(--border);
    }
    .row:first-child {
      border-top: none;
    }
    .item-name {
      font-weight: 500;
    }
    .empty {
      padding: 40px 20px;
      text-align: center;
    }
  `,
})
export class ShoppingListPage {
  list = inject(ShoppingListService);
  name = signal('');
  amount = signal('');

  add(event: Event) {
    event.preventDefault();
    const name = this.name().trim();
    if (!name) return;
    this.list.add({ name, amount: this.amount().trim() || '1' });
    this.clear();
  }

  clear() {
    this.name.set('');
    this.amount.set('');
  }
}
