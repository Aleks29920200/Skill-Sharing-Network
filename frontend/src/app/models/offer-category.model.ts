// src/app/models/offer-category.model.ts
import { ServiceOffer } from './service-offer.model';

export interface OfferCategory {
  id: number;
  name: string;
  offers?: ServiceOffer[]; // Optional to handle circular dependency safely
}
