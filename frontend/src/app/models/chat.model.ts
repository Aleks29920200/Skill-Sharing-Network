// src/app/models/chat.models.ts

import {UserStatus} from './enums.model';

export interface ChatMessage {
  id?: string;
  sender: string;
  receiver?: string; // Enforce that receiver is always a string
  content: string;
  timestamp?: string;

  // WebRTC Fields mapped to your Java Backend
  messageType?: string;
  offer?: any;
  answer?: any;
  candidate?: any;
  edited?: boolean;
  indicatorForDeletion?: boolean;
  replyToMessageId?: string;
}

export interface ChatUser {
  username: string;
  online: boolean; // Boolean for the green/gray dot logic
}
