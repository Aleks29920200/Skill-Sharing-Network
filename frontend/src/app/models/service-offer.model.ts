// src/app/models/service-offer.model.ts
import { User } from './user.model';
import { OfferCategory } from './offer-category.model';
import { OfferStatus } from './enums.model';

export interface ServiceOffer {
  id: number;
  name: string;
  price: number; // BigDecimal -> number
  categories: OfferCategory[];
  seller: User;
  status: OfferStatus;
}
