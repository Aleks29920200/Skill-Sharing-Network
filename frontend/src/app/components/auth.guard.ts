import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ----------------------------------------------------------------
  // OPTION A: SSR BLOCKER
  // ----------------------------------------------------------------
  // If we are running on the Server, we effectively treat the user
  // as "not logged in" (since the server has no LocalStorage).
  // We redirect to login immediately to stop the protected component
  // from rendering and making API calls.
  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/login']);
  }

  // ----------------------------------------------------------------
  // BROWSER LOGIC
  // ----------------------------------------------------------------
  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. SSR Check
  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/login']);
  }

  // 2. Browser Check
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  } else {
    // Logged in but not Admin? Redirect to home
    return router.createUrlTree(['/home']);
  }
};
