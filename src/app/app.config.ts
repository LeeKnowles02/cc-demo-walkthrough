import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // Hash routing (/#/recipes) so the static site works without any server rewrite rules.
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes, withHashLocation())],
};
