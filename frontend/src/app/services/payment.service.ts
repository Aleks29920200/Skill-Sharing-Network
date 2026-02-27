import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Corresponds to PaymentController: createPaymentIntent
  createPaymentIntent(offerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment`, { offerId });
  }

  // Corresponds to HostedCheckoutController: createCheckoutSession
  createHostedCheckoutSession(offerId: number): Observable<any> {
    // Note: The backend redirects, but in Angular you usually get the URL and window.location.href to it
    return this.http.post(`${this.apiUrl}/hostedCheckout/create-checkout-session`, { offerId });
  }
}
