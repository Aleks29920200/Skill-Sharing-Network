// src/app/models/block.model.ts
export interface Block {
  id: number;
  blockerUsername: string;
  blockedUsername: string;
  blockedAt: Date; // LocalDateTime -> ISO string
}
