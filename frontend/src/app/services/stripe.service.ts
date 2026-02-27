import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadStripe, Stripe } from '@stripe/stripe-js';
// import { environment } from '../environments/environment'; // Recommended

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;
  // TODO: Move this to environment.ts
  private readonly publishableKey = 'pk_test_YOUR_KEY_HERE';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // 1. Load Stripe only once when the app starts (in the browser)
    if (isPlatformBrowser(this.platformId)) {
      this.stripePromise = loadStripe(this.publishableKey);
    } else {
      // Return null for SSR so the app doesn't crash during build/prerender
      this.stripePromise = Promise.resolve(null);
    }
  }

  async handleCheckout(sessionId: string) {
    // 2. Await the ALREADY initialized promise
    const stripe = await this.stripePromise;

    // 3. Safety check: If we are on the server or Stripe failed to load
    if (!stripe) {
      console.error('Stripe is not loaded or we are in a non-browser environment.');
      return;
    }

    // 4. Redirect
    const { error } = await (stripe as any).redirectToCheckout({
      sessionId: sessionId
    });

    if (error) {
      console.error('Stripe redirect error:', error);
    }
  }
}
