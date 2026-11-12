import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  template: `
    <main class="auth">
      <div>
        <h1>Create account</h1>
        <p class="muted">Save recipes and build your shopping list in one place.</p>
      </div>
      <div class="card">
        <form>
          <div>
            <label class="label" for="name">Name</label>
            <input class="input" id="name" type="text" placeholder="Your name" />
          </div>
          <div>
            <label class="label" for="email">Email</label>
            <input class="input" id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label class="label" for="password">Password</label>
            <input class="input" id="password" type="password" placeholder="At least 6 characters" />
          </div>
          <div>
            <label class="label" for="confirm">Confirm password</label>
            <input class="input" id="confirm" type="password" placeholder="Repeat your password" />
          </div>
          <!-- Demo only: the button just goes to the recipes page. -->
          <a class="btn btn-primary" routerLink="/recipes">Create account</a>
          <p class="muted">Already have an account? <a routerLink="/login">Log in</a></p>
        </form>
      </div>
      <p class="muted">Demo app. Sign-up isn't connected to a backend.</p>
    </main>
  `,
})
export class Register {}
