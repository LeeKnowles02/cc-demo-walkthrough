---
title: "Recipe Book pages"
description: "What each page of Recipe Book shows: the header, Log in, Create account, Recipes and Shopping list."
type: info
---

# Recipe Book pages

Recipe Book is a demo app with four pages. It has no backend: signing in is not checked, and the shopping list resets when the page is refreshed.

## Header

Every page shows the **Recipe Book** logo, which opens **Recipes**, and two tabs: **Recipes** and **Shopping list**. On the right, **Log in** shows on the Log in and Create account pages, and **Log out** on every other page.

## Log in

The page the app opens on. It has **Email** and **Password** fields and a **Log in** button. **Create one** opens Create account.

## Create account

Has **Name**, **Email**, **Password** and **Confirm password** fields and a **Create account** button. **Log in** returns to Log in.

## Recipes

The title shows how many recipes there are.

- **All recipes**: each recipe with a short description, the time it takes and how many it serves. Click one to show it under Details.
- **Details**: the selected recipe's name, description, time and servings, its **Ingredients** with amounts, and an **Add to shopping list** button.

## Shopping list

The title shows how many items are on the list.

- **Add item**: **Ingredient** and **Amount** fields, with **Clear** and **Add item** buttons.
- **Items**: each item with its amount and a **Remove** button. An empty list shows "Your shopping list is empty."
