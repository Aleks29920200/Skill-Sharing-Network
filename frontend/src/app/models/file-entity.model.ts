// src/app/models/file-entity.model.ts
export interface FileEntity {
  id: number;
  fileName: string;
  contentType: string;
  fileData?: string; // Base64 string if sent, otherwise optional
}
