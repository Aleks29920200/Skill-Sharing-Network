// src/app/services/block.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class BlockService {
  private apiUrl = `${environment.apiUrl}/blocks`;

  constructor(private http: HttpClient) {}


  isBlocked(sourceUsername: string, targetUsername: string): Observable<boolean> {
    const params = new HttpParams()
      .set('source', sourceUsername)
      .set('target', targetUsername);
    return this.http.get<boolean>(`${this.apiUrl}/is-blocked`, { params });
  }
  blockUser(blocker: string, blocked: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { blocker, blocked }, { responseType: 'text' });
  }

  unblockUser(blocker: string, blocked: string): Observable<any> {
    const params = new HttpParams().set('blocker', blocker).set('blocked', blocked);
    // MUST BE this.http.delete
    return this.http.delete(`http://localhost:8080/api/blocks`, { params, responseType: 'text' });
  }
  // Matches: getBlockedUsers(username) -> Returns list of usernames (strings)
  getBlockedUsers(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${username}/blocked`);
  }

  // Matches: getBlockedByUsers(username) -> Returns list of usernames (strings)
  getBlockedByUsers(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${username}/blocked-by`);
  }
}
