import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  // Spring Boot Endpoint
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // POST /api/upload
  // Отговаря на FileUploadController.java
  upload(file: File): Observable<any> {
    const formData = new FormData();
    // В Java моделът е FileUploadModel с поле 'img', затова тук append-ваме 'img'
    formData.append('img', file);

    return this.http.post(`${this.baseUrl}/api/upload`, formData);
  }

  // GET /download/{fileId}
  // Отговаря на FileDownloadController.java
  // Връщаме Blob, за да можем да го покажем като картинка или да го свалим
  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileId}`, {
      responseType: 'blob'
    });
  }

  // Помощен метод за генериране на директен URL към картинката
  // Това може да се ползва в <img [src]="getFileUrl(id)">
  getFileUrl(fileId: number): string {
    return `${this.baseUrl}/download/${fileId}`;
  }
}
