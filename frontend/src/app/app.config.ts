import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router'; // withComponentInputBinding е полезно за параметри
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';

import { routes } from './app.routes';
import {authInterceptor} from './core/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Добавих binding за по-лесна работа с ID-та
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    // ВАЖНО: Смени този ключ с реалния си Stripe Publishable Key от dashboard.stripe.com
    provideNgxStripe('pk_test_YOUR_REAL_KEY_HERE')
  ]
};
