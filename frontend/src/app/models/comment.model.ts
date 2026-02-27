// src/app/models/comment.model.ts
import { User } from './user.model';
import { Review } from './review.model';

export interface Comment {
  id: number;
  text: string;
  date: Date; // LocalDate -> ISO String (e.g., "2023-10-25")
  author: User;
  review?: Review; // Optional to prevent infinite recursion if not needed
}
