// src/app/models/offer-request.model.ts
import { OfferStatus } from './enums.model';

export interface OfferRequest {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  quantityAvailable: number;
  status: OfferStatus;

  // Relationships managed by ID or strings
  sellerId: number;
  featureNames: string[];
  categoryIds: number[];

  // Discounts
  discountPercentage?: number;
  discountExpiration?: string; // LocalDateTime -> ISO string
}
