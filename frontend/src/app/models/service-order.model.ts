// src/app/models/service-order.model.ts
import { User } from './user.model';
import { ServiceOffer } from './service-offer.model';
import { OrderStatus } from './enums.model';

export interface ServiceOrder {
  id: number;
  buyer: User;
  offer: ServiceOffer;
  stripePaymentIntentId?: string; // Optional as it might be null initially
  status: OrderStatus;
  amount: number;
  currency: string;
  orderDate: string; // LocalDateTime -> ISO string
}
