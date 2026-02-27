// src/app/services/message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MessageDto } from '../models/dtos.model';
import {environment} from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

  saveMessage(message: MessageDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.apiUrl}`, message);
  }

  getChatHistory(user1: string, user2: string): Observable<MessageDto[]> {
    const params = new HttpParams()
      .set('user1', user1)
      .set('user2', user2);
    return this.http.get<MessageDto[]>(`${this.apiUrl}/history`, { params });
  }

  editMessage(id: number, newContent: string): Observable<MessageDto> {
    // Assuming backend expects a simple string or object.
    // Sending as text/plain often requires specific responseType handling
    return this.http.put<MessageDto>(`${this.apiUrl}/${id}`, newContent);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
