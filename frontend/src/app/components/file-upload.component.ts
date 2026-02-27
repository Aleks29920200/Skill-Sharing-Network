import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileService} from '../services/file.service';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white shadow rounded-lg max-w-md mx-auto mt-5">
      <h3 class="text-xl font-bold mb-4 text-gray-800">Upload Document/Image</h3>

      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Select file</label>
        <input
          (change)="onFileSelected($event)"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          id="file_input"
          type="file">
      </div>

      <button
        (click)="onUpload()"
        [disabled]="!selectedFile || isUploading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition">
        {{ isUploading ? 'Uploading...' : 'Upload File' }}
      </button>

      <div *ngIf="message" class="mt-4 p-3 rounded"
           [ngClass]="isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
        {{ message }}
      </div>

      <div *ngIf="uploadedFileId" class="mt-4 text-center">
        <p class="text-sm text-gray-500 mb-2">Uploaded Preview:</p>
        <img [src]="getFileUrl(uploadedFileId)" class="max-h-48 mx-auto rounded shadow" alt="Uploaded file">
      </div>
    </div>
  `
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  message = '';
  isSuccess = false;
  isUploading = false;
  uploadedFileId: number | null = null;

  constructor(private fileService: FileService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.message = ''; // Изчистваме старите съобщения
      this.uploadedFileId = null;
    }
  }

  onUpload() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.message = '';

    this.fileService.upload(this.selectedFile).subscribe({
      next: (response: any) => {
        // Backend-ът връща JSON: { "message": "...", "fileId": 123 }
        this.message = response.message || 'File uploaded successfully!';
        this.uploadedFileId = response.fileId;
        this.isSuccess = true;
        this.isUploading = false;
      },
      error: (err) => {
        console.error(err);
        this.message = 'Could not upload the file!';
        this.isSuccess = false;
        this.isUploading = false;
      }
    });
  }

  getFileUrl(id: number): string {
    return this.fileService.getFileUrl(id);
  }
}
