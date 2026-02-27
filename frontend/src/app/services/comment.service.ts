// src/app/services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { CreateCommentRequest } from '../models/dtos.model';
import {environment} from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  // Matches: addComment(User, String, Review)
  addComment(request: CreateCommentRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, request);
  }

  // Matches: findCommentByReview(Review)
  // We pass the review ID instead of the Review entity
  getCommentsByReviewId(reviewId: number): Observable<Comment[]> {
    const params = new HttpParams().set('reviewId', reviewId);
    return this.http.get<Comment[]>(`${this.apiUrl}/by-review`, { params });
  }
}
