// src/app/models/offer-feature.model.ts
import { ServiceOffer } from './service-offer.model';

export interface OfferFeature {
  id: number;
  name: string;
  offer: ServiceOffer;
}
