# cc-demo-angular

A small Angular static site (Recipe Book) used to test and demo Code Capsules. Frontend only: no API, no database. Login/register are not real, and the shopping list lives in memory (resets on refresh).

Pages: Log in, Create account, Recipes, Shopping list.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4200.

## Build

```bash
npm run build
```

Output: `dist/cc-demo-angular/browser`

## Deploy on Code Capsules (static site)

- Build command: `npm run build`
- Publish directory: `dist/cc-demo-angular/browser`

Routing uses the URL hash (`/#/recipes`), so no server rewrite rules are needed.

## Tests

```bash
npm test
```

## Layout

- `src/app/data.ts`: recipes and the in-memory shopping list
- `src/app/login.ts`, `register.ts`, `recipes.ts`, `shopping-list.ts`: the four pages
- `src/styles.scss`: Code Capsules colours and shared styles
# cc-demo-walkthrough
