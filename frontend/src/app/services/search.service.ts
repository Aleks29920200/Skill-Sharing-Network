import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/dtos.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Make sure this matches your Controller's @RequestMapping ("api/search" or similar)
  private baseUrl = 'http://localhost:8080/api/search';

  constructor(private http: HttpClient) {}


  searchByCategory(category: string): Observable<UserDTO[]> {
    // New Syntax: Slash instead of Question Mark
    return this.http.get<UserDTO[]>(`${this.baseUrl}/category/${category}`);
  }


  searchByKeyword(query: string): Observable<UserDTO[]> {
    // New Syntax: POST request with a JSON body
    const body = { info: query };
    return this.http.post<UserDTO[]>(`${this.baseUrl}`, body);
  }
}
