import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  template: `
    <main class="auth">
      <div>
        <h1>Log in</h1>
        <p class="muted">Welcome back. Log in to see your recipes and shopping list.</p>
      </div>
      <div class="card">
        <form>
          <div>
            <label class="label" for="email">Email</label>
            <input class="input" id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label class="label" for="password">Password</label>
            <input class="input" id="password" type="password" placeholder="Enter your password" />
          </div>
          <!-- Demo only: the button just goes to the recipes page. -->
          <a class="btn btn-primary" routerLink="/recipes">Log in</a>
          <p class="muted">Don't have an account? <a routerLink="/register">Create one</a></p>
        </form>
      </div>
      <p class="muted">Demo app. Sign-in isn't connected to a backend.</p>
    </main>
  `,
})
export class Login {}
