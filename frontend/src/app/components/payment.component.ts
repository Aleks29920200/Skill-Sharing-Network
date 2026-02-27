import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  template: `
    <div class="payment-container">
      <h3>Complete your Purchase</h3>
      <button (click)="payWithHostedCheckout()">Pay via Stripe Checkout (Redirect)</button>

      <div class="divider">OR</div>

      <button (click)="payWithCustomFlow()">Pay with Card</button>
    </div>
  `
})
export class PaymentComponent {
  // Replace with your actual Stripe Public Key
  stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLIC_KEY');
  offerId = 1; // Example Offer ID

  constructor(private paymentService: PaymentService) {}

  // Option 1: Hosted Checkout (Redirects user to Stripe)
  payWithHostedCheckout() {
    this.paymentService.createHostedCheckoutSession(this.offerId).subscribe({
      next: async (response: any) => {
        // Backend returns a JSON object with the session URL or ID
        // Assuming backend returns: { url: "https://checkout.stripe.com/..." }
        if (response.url) {
          window.location.href = response.url;
        }
      },
      error: (err) => console.error('Payment initialization failed', err)
    });
  }

  // Option 2: Custom Element Flow (Advanced)
  async payWithCustomFlow() {
    this.paymentService.createPaymentIntent(this.offerId).subscribe({
      next: async (data: any) => {
        const stripe = await this.stripePromise;
        // Use stripe.confirmCardPayment using data.clientSecret here
        console.log('Client Secret received:', data.clientSecret);
      }
    });
  }
}
