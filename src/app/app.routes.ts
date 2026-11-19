import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Recipes } from './features/recipes/recipes';
import { ShoppingListPage } from './features/shopping-list/shopping-list-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'recipes', component: Recipes },
  { path: 'shopping-list', component: ShoppingListPage },
  { path: '**', redirectTo: 'login' },
];
