// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReviewDto } from '../models/dtos.model';
import {environment} from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  // Matches: addReview(reviewer, revieweeId, content)
  addReview(reviewerUsername: string, revieweeId: number, content: string): Observable<void> {
    const payload = { reviewerUsername, revieweeId, content };
    return this.http.post<void>(`${this.apiUrl}/add`, payload);
  }

  getReviewsForUser(username: string): Observable<ReviewDto[]> {
    // Assuming controller endpoint is something like /reviews/user/{username}
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/user/${username}`);
  }
}
