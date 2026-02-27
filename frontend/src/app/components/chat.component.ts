import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

// Models
import { ChatMessage } from '../models/chat.model';
import {BlockService} from '../services/block.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="flex h-screen w-full bg-white relative overflow-hidden">

      <div *ngIf="isInCall" class="absolute inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <h2 class="text-2xl mb-4" [class.animate-pulse]="!isCallConnected">
          {{ isCallConnected ? 'In call with ' + targetUser : 'Calling ' + targetUser + '...' }}
        </h2>

        <div class="flex gap-4 w-full max-w-7xl h-[80vh] bg-black rounded-xl overflow-hidden shadow-2xl relative">
          <video #remoteVideo autoplay playsinline class="w-full h-full object-cover"></video>
          <video #localVideo autoplay playsinline [muted]="true" class="absolute bottom-4 right-4 w-48 h-32 bg-gray-800 rounded-lg border-2 border-indigo-500 object-cover shadow-lg"></video>
        </div>

        <button (click)="endVideoCall()" class="mt-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
          </svg>
        </button>
      </div>

      <div class="w-full h-full bg-white flex flex-col overflow-hidden relative" *ngIf="!isInCall">

        <div class="p-4 bg-indigo-600 text-white flex justify-between items-center z-10 shadow-md">
          <div class="flex items-center gap-3">
            <button routerLink="/" class="p-2 bg-indigo-700 hover:bg-indigo-800 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div>
              <h2 class="font-bold text-lg">{{ targetUser ? targetUser : 'Loading...' }}</h2>
            </div>
          </div>

          <div class="flex gap-3 items-center">
            <button (click)="startVideoCall()" *ngIf="targetUser && !isBlockedByMe && !isBlockedByThem" class="p-2 bg-indigo-500 hover:bg-indigo-400 rounded-full transition" title="Start Video Call">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
            </button>

            <button *ngIf="targetUser" (click)="toggleBlockUser()" class="text-sm font-medium px-4 py-2 rounded-lg transition shadow ml-2 text-white"
                    [class.bg-gray-500]="isBlockedByMe" [class.hover:bg-gray-600]="isBlockedByMe"
                    [class.bg-red-500]="!isBlockedByMe" [class.hover:bg-red-600]="!isBlockedByMe">
              {{ isBlockedByMe ? 'Unblock' : 'Block' }}
            </button>

            <button class="text-sm font-medium bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-lg transition shadow ml-2 text-white" (click)="logout()">Logout</button>
          </div>
        </div>

        <div class="flex-grow p-6 overflow-y-auto bg-slate-50" #scrollContainer>
          <div *ngIf="isLoading" class="flex justify-center mt-10">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>

          <div *ngIf="!isLoading && messages.length === 0 && targetUser" class="text-center mt-20 text-gray-400">
            <p>No messages yet. Say hello!</p>
          </div>

          <div *ngFor="let msg of messages" class="mb-4 flex flex-col">

            <div *ngIf="msg.sender === currentUser" class="flex justify-end items-end gap-2">

              <div *ngIf="selectedMessage === msg && !msg.indicatorForDeletion" class="flex gap-2 mb-2">
                <button (click)="initiateReply(msg)" class="p-2 text-gray-600 hover:text-indigo-600 bg-white rounded shadow-md hover:bg-gray-100 transition" title="Reply">↩️</button>
                <button (click)="initiateEdit(msg)" *ngIf="!msg.content.startsWith('[AUDIO]')" class="p-2 text-gray-600 hover:text-blue-600 bg-white rounded shadow-md hover:bg-gray-100 transition" title="Edit">✏️</button>
                <button (click)="deleteMessage(msg)" class="p-2 text-gray-600 hover:text-red-600 bg-white rounded shadow-md hover:bg-gray-100 transition" title="Delete">🗑️</button>
              </div>

              <div (click)="toggleSelection(msg)"
                   class="bg-indigo-600 text-white rounded-2xl rounded-br-sm py-2 px-4 max-w-md shadow-sm relative cursor-pointer hover:bg-indigo-700 transition"
                   [class.opacity-50]="msg.indicatorForDeletion || msg.id?.toString()?.startsWith('temp-')"
                   [class.ring-4]="selectedMessage === msg" [class.ring-indigo-300]="selectedMessage === msg">

                <div *ngIf="msg.replyToMessageId" class="bg-indigo-800/50 text-indigo-100 text-xs p-2 rounded mb-1 border-l-2 border-indigo-300">
                  Replying to: {{ getMessageExcerpt(msg.replyToMessageId) }}
                </div>

                <p class="text-sm" *ngIf="!msg.content.startsWith('[AUDIO]') && !msg.indicatorForDeletion">{{ msg.content }}</p>
                <p class="text-sm italic" *ngIf="msg.indicatorForDeletion">🚫 This message was deleted</p>

                <audio controls *ngIf="msg.content.startsWith('[AUDIO]') && !msg.indicatorForDeletion" [src]="getAudioUrl(msg.content)" class="h-10 w-48 rounded-lg outline-none mt-1" (click)="$event.stopPropagation()"></audio>
                <span *ngIf="msg.edited && !msg.indicatorForDeletion" class="text-[10px] text-indigo-200 block mt-1 text-right">(edited)</span>
                <span *ngIf="msg.id?.toString()?.startsWith('temp-')" class="text-[10px] text-indigo-200 block mt-1 text-right">Sending...</span>
              </div>
            </div>

            <div *ngIf="msg.sender === targetUser" class="flex justify-start items-end gap-2">
              <div (click)="toggleSelection(msg)"
                   class="bg-white text-gray-800 rounded-2xl rounded-bl-sm py-2 px-4 max-w-md shadow-sm border border-gray-200 relative cursor-pointer hover:bg-gray-50 transition"
                   [class.opacity-50]="msg.indicatorForDeletion"
                   [class.ring-4]="selectedMessage === msg" [class.ring-indigo-300]="selectedMessage === msg">

                <div *ngIf="msg.replyToMessageId" class="bg-gray-100 text-gray-500 text-xs p-2 rounded mb-1 border-l-2 border-gray-400">
                  Replying to: {{ getMessageExcerpt(msg.replyToMessageId) }}
                </div>

                <p class="text-sm" *ngIf="!msg.content.startsWith('[AUDIO]') && !msg.indicatorForDeletion">{{ msg.content }}</p>
                <p class="text-sm italic text-gray-400" *ngIf="msg.indicatorForDeletion">🚫 This message was deleted</p>

                <audio controls *ngIf="msg.content.startsWith('[AUDIO]') && !msg.indicatorForDeletion" [src]="getAudioUrl(msg.content)" class="h-10 w-48 rounded-lg outline-none mt-1" (click)="$event.stopPropagation()"></audio>
                <span *ngIf="msg.edited && !msg.indicatorForDeletion" class="text-[10px] text-gray-400 block mt-1 text-right">(edited)</span>
              </div>

              <div *ngIf="selectedMessage === msg && !msg.indicatorForDeletion" class="flex gap-2 mb-2">
                <button (click)="initiateReply(msg)" class="p-2 text-gray-600 hover:text-indigo-600 bg-white rounded shadow-md hover:bg-gray-100 transition" title="Reply">↩️</button>
              </div>
            </div>

          </div>
        </div>

        <div *ngIf="showEmojis" class="absolute bottom-32 left-4 bg-white border border-gray-200 shadow-xl rounded-lg p-3 flex flex-wrap gap-2 w-64 z-20">
          <button *ngFor="let emoji of commonEmojis" (click)="addEmoji(emoji)" class="text-2xl hover:bg-gray-100 p-1 rounded transition">
            {{ emoji }}
          </button>
        </div>

        <div *ngIf="isBlockedByMe || isBlockedByThem" class="p-4 bg-gray-100 border-t border-gray-200 flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p class="font-bold">{{ isBlockedByMe ? 'You have blocked this user.' : 'You cannot send messages to this user.' }}</p>
          <button *ngIf="isBlockedByMe" (click)="toggleBlockUser()" class="mt-2 text-indigo-600 hover:underline text-sm">Tap to unblock</button>
        </div>

        <div *ngIf="!isBlockedByMe && !isBlockedByThem" class="p-4 bg-white border-t border-gray-200 flex flex-col z-10">

          <div *ngIf="replyingToMessage" class="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg text-sm text-gray-600 border-l-4 border-indigo-500 mb-2">
            <span>Replying to {{ replyingToMessage.sender }}: <em>{{ replyingToMessage.content | slice:0:30 }}...</em></span>
            <button (click)="cancelReply()" class="text-gray-400 hover:text-red-500">✖</button>
          </div>
          <div *ngIf="editingMessage" class="flex justify-between items-center bg-blue-50 p-2 rounded-t-lg text-sm text-blue-600 border-l-4 border-blue-500 mb-2">
            <span>Editing message...</span>
            <button (click)="cancelEdit()" class="text-blue-400 hover:text-red-500">✖</button>
          </div>

          <div *ngIf="isRecording" class="flex items-center gap-2 mb-2 text-red-500 animate-pulse">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class="text-sm font-bold">Recording Voice Message... Click mic to stop and send.</span>
          </div>

          <div class="flex gap-2 items-center">
            <button type="button" (click)="showEmojis = !showEmojis" class="p-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>

            <input type="text" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()"
                   [placeholder]="editingMessage ? 'Edit your message...' : 'Type your message...'" [disabled]="!targetUser || isRecording"
                   class="flex-grow p-4 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition disabled:opacity-50 outline-none">

            <button (click)="toggleRecording()" [disabled]="!targetUser || editingMessage !== null" [class.text-red-600]="isRecording" [class.bg-red-50]="isRecording"
                    class="p-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition disabled:opacity-50">
              <svg *ngIf="!isRecording" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              <svg *ngIf="isRecording" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
            </button>

            <button (click)="sendMessage()" [disabled]="!targetUser || (!newMessage.trim() && !isRecording)"
                    [class.bg-blue-500]="editingMessage" [class.hover:bg-blue-600]="editingMessage"
                    [class.bg-indigo-600]="!editingMessage" [class.hover:bg-indigo-700]="!editingMessage"
                    class="text-white px-6 py-3 rounded-xl font-bold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              {{ editingMessage ? 'Save' : 'Send' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  // --- Core State Variables ---
  currentUser: string = '';
  targetUser: string | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  showEmojis: boolean = false;
  isProcessingBlock: boolean = false;
  commonEmojis = ['😀','😂','🥰','😎','🤔','😢','😡','👍','👎','❤️','🔥','🎉'];

  // --- Interaction States ---
  selectedMessage: ChatMessage | null = null;
  replyingToMessage: ChatMessage | null = null;
  editingMessage: ChatMessage | null = null;

  // --- Block States ---
  isBlockedByMe: boolean = false;
  isBlockedByThem: boolean = false;

  // --- WebRTC Video States ---
  isInCall: boolean = false;
  isCallConnected: boolean = false;
  peerConnection: RTCPeerConnection | null = null;
  localStream: MediaStream | null = null;
  private rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  // --- Audio Recording States ---
  isRecording: boolean = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: BlobPart[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,private blockService: BlockService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUser = this.authService.getCurrentUsername() || '';
  }ngOnInit(): void {
  if (!this.currentUser) {
    this.router.navigate(['/login']);
    return;
  }

  if (isPlatformBrowser(this.platformId)) {
    this.chatService.initializeWebSocketConnection(this.currentUser);

    // --- 1. LISTEN FOR INCOMING TEXT & UPDATES ---
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((incomingMsg: ChatMessage) => {
        const isFromTarget = incomingMsg.sender === this.targetUser;
        const isSentByMeToTarget = incomingMsg.receiver === this.targetUser && incomingMsg.sender === this.currentUser;

        if (isFromTarget || isSentByMeToTarget) {

          // Handle deletions instantly
          if (incomingMsg.indicatorForDeletion) {
            if (this.replyingToMessage?.id === incomingMsg.id) this.cancelReply();
            if (this.editingMessage?.id === incomingMsg.id) this.cancelEdit();
            if (this.selectedMessage?.id === incomingMsg.id) this.selectedMessage = null;
          }

          // Optimistic UI Swap: Find real ID or our Temporary ID
          const index = this.messages.findIndex(m =>
            m.id === incomingMsg.id ||
            (m.sender === incomingMsg.sender && m.content === incomingMsg.content && String(m.id).startsWith('temp-'))
          );

          if (index !== -1) {
            this.messages[index] = incomingMsg; // Swap temp for real, or apply edit/delete
          } else {
            this.messages.push(incomingMsg);
            this.scrollToBottom();
          }
        }
      });

    // --- 2. LISTEN FOR WEBRTC VIDEO CALLS ---
    this.chatService.callOffer$.pipe(takeUntil(this.destroy$)).subscribe(async offerMsg => {
      if (offerMsg.sender === this.targetUser) await this.answerVideoCall(offerMsg.offer);
    });

    this.chatService.callAnswer$.pipe(takeUntil(this.destroy$)).subscribe(async answerMsg => {
      if (answerMsg.sender === this.targetUser && this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerMsg.answer));
        this.isCallConnected = true;
      }
    });

    this.chatService.callIce$.pipe(takeUntil(this.destroy$)).subscribe(async iceMsg => {
      if (iceMsg.sender === this.targetUser && this.peerConnection && iceMsg.candidate) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(iceMsg.candidate));
      }
    });

    // --- 3. HANDLE ROUTE CHANGES ---
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const usernameParam = params.get('username');
      if (usernameParam) this.loadUserChat(usernameParam);
      else this.router.navigate(['/']);
    });
  }
}

  // --- LOADING HISTORY AND BLOCK STATUS ---

  loadUserChat(username: string): void {
    this.targetUser = username;
    this.messages = [];
    this.isLoading = true;
    this.selectedMessage = null;
    this.isBlockedByMe = false;
    this.isBlockedByThem = false;

    // 1. Fetch Chat History
    this.chatService.getChatHistory(this.currentUser, username).subscribe({
      next: (history: any[]) => { // Changed type to any[] temporarily to allow dynamic properties

        // FIX: Calculate Audio URLs here ONCE instead of 1000x times in the HTML
        this.messages = (history || []).map(msg => ({
          ...msg,
          isAudio: msg.content.startsWith('[AUDIO]'),
          audioUrl: msg.content.startsWith('[AUDIO]')
            ? 'http://localhost:8080' + msg.content.replace('[AUDIO]', '')
            : null
        }));

        this.isLoading = false;
        this.scrollToBottom();
      },
      error: () => this.isLoading = false
    });

    // 2. FETCH BLOCK STATUS
    this.blockService.isBlocked(this.currentUser, username).subscribe(res => this.isBlockedByMe = res);
    this.blockService.isBlocked(username, this.currentUser).subscribe(res => this.isBlockedByThem = res);
  }

  toggleBlockUser() {
    // 1. Stop if no target user, or if a request is already running
    if (!this.targetUser || this.isProcessingBlock) return;

    // 2. Force strict true/false check (fixes Angular JSON parsing bugs)
    const currentlyBlocked = (this.isBlockedByMe === true || String(this.isBlockedByMe) === 'true');

    if (currentlyBlocked) {
      // ----------------- UNBLOCK -----------------
      if (confirm(`Are you sure you want to UNBLOCK ${this.targetUser}?`)) {
        this.isProcessingBlock = true; // Lock button

        this.blockService.unblockUser(this.currentUser, this.targetUser).subscribe({
          next: () => {
            this.isBlockedByMe = false;
            this.isProcessingBlock = false; // Unlock button
          },
          error: (err) => {
            console.error("Unblock Error:", err);
            alert("Failed to unblock. Server error.");
            this.isProcessingBlock = false;
          }
        });
      }
    } else {
      // ----------------- BLOCK -----------------
      if (confirm(`Are you sure you want to BLOCK ${this.targetUser}?`)) {
        this.isProcessingBlock = true; // Lock button

        this.blockService.blockUser(this.currentUser, this.targetUser).subscribe({
          next: () => {
            this.isBlockedByMe = true;
            this.endVideoCall();
            this.isProcessingBlock = false; // Unlock button
          },
          error: (err) => {
            console.error("Block Error:", err);
            alert("Failed to block. Server error.");
            this.isProcessingBlock = false;
          }
        });
      }
    }
  }



  toggleSelection(msg: ChatMessage) {
    if (this.selectedMessage === msg) {
      this.selectedMessage = null;
    } else {
      this.selectedMessage = msg;
    }
  }

  initiateReply(msg: ChatMessage) {
    this.cancelEdit();
    this.replyingToMessage = msg;
    this.selectedMessage = null;
    document.querySelector('input')?.focus();
  }

  cancelReply() { this.replyingToMessage = null; }

  initiateEdit(msg: ChatMessage) {
    this.cancelReply();
    this.editingMessage = msg;
    this.newMessage = msg.content;
    this.selectedMessage = null;
    document.querySelector('input')?.focus();
  }

  cancelEdit() {
    this.editingMessage = null;
    this.newMessage = '';
  }

  deleteMessage(msg: ChatMessage) {
    if (confirm("Are you sure you want to delete this message?")) {
      this.selectedMessage = null;

      if (this.replyingToMessage?.id === msg.id) this.cancelReply();
      if (this.editingMessage?.id === msg.id) this.cancelEdit();

      const deletedMsg = { ...msg, indicatorForDeletion: true };
      const index = this.messages.findIndex(m => m.id === msg.id);
      if (index !== -1) this.messages[index] = deletedMsg;

      this.chatService.deleteMessage(msg);
    }
  }

  getMessageExcerpt(id: string): string {
    const msg = this.messages.find(m => m.id === id || m.id?.toString() === id?.toString());
    if (!msg) return 'Message...';
    return msg.content.startsWith('[AUDIO]') ? 'Voice message' : (msg.content.substring(0, 30) + (msg.content.length > 30 ? '...' : ''));
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.targetUser || this.isBlockedByMe || this.isBlockedByThem) return;

    if (this.editingMessage) {
      const updatedMsg = { ...this.editingMessage, content: this.newMessage, edited: true };
      const index = this.messages.findIndex(m => m.id === this.editingMessage!.id);
      if (index !== -1) this.messages[index] = updatedMsg;

      this.chatService.editMessage(updatedMsg);
      this.cancelEdit();
      return;
    }

    // CREATE TEMPORARY ID FOR OPTIMISTIC UI
    const tempId = 'temp-' + Date.now();

    const newMsg: ChatMessage = {
      id: tempId,
      sender: this.currentUser,
      receiver: this.targetUser!,
      content: this.newMessage,
      timestamp: new Date().toISOString()
    };

    if (this.replyingToMessage && this.replyingToMessage.id) {
      newMsg.replyToMessageId = this.replyingToMessage.id.toString();
    }

    // 1. Instantly push to UI (Keeps the tempId)
    this.messages.push(newMsg);
    this.scrollToBottom();

    // 2. Prepare for Backend (Strip the tempId out!)
    const backendMsg = { ...newMsg };
    delete backendMsg.id; // <-- THIS PREVENTS THE JAVA 500 ERROR

    // 3. Send the clean message to Backend
    this.chatService.sendMessage(backendMsg);

    this.newMessage = '';
    this.showEmojis = false;
    this.cancelReply();
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojis = false;
  }
  // --- WEBRTC VIDEO CALL LOGIC --- //

  async startVideoCall() {
    // Prevent call if blocked
    if (!this.targetUser || this.isBlockedByMe || this.isBlockedByThem) return;

    this.isInCall = true;
    this.isCallConnected = false;

    const setupSuccess = await this.setupWebRTC();
    if (!setupSuccess) {
      this.endVideoCall();
      return;
    }

    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);

    const offerMessage: ChatMessage = {
      sender: this.currentUser,
      receiver: this.targetUser!,
      content: 'Incoming video call',
      timestamp: new Date().toISOString(),
      messageType: 'VIDEO_SIGNAL',
      offer: offer
    };
    this.chatService.sendCallOffer(offerMessage);
  }

  async answerVideoCall(offerData: any) {
    // Prevent answering if blocked
    if (!this.targetUser || this.isBlockedByMe || this.isBlockedByThem) return;

    this.isInCall = true;
    this.isCallConnected = true;

    const setupSuccess = await this.setupWebRTC();
    if (!setupSuccess) {
      this.endVideoCall();
      return;
    }

    await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offerData));
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);

    const answerMessage: ChatMessage = {
      sender: this.currentUser,
      receiver: this.targetUser!,
      content: 'Answered video call',
      timestamp: new Date().toISOString(),
      messageType: 'VIDEO_SIGNAL',
      answer: answer
    };
    this.chatService.sendCallAnswer(answerMessage);
  }

  async setupWebRTC(): Promise<boolean> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (e) {
      console.error("Failed to access camera/mic", e);
      alert("Could not access camera or microphone!");
      return false;
    }

    setTimeout(() => {
      if (this.localVideo) this.localVideo.nativeElement.srcObject = this.localStream;
    }, 100);

    this.peerConnection = new RTCPeerConnection(this.rtcConfig);

    this.localStream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, this.localStream!);
    });

    this.peerConnection.ontrack = (event) => {
      if (this.remoteVideo) {
        this.remoteVideo.nativeElement.srcObject = event.streams[0];
      }
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.targetUser) {
        const iceMessage: ChatMessage = {
          sender: this.currentUser,
          receiver: this.targetUser!,
          content: 'Network routing info',
          timestamp: new Date().toISOString(),
          messageType: 'VIDEO_SIGNAL',
          candidate: event.candidate
        };
        this.chatService.sendIceCandidate(iceMessage);
      }
    };

    return true;
  }

  endVideoCall() {
    this.isInCall = false;
    this.isCallConnected = false;

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }


  // --- AUDIO RECORDING LOGIC --- //

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.uploadAudioFile(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      this.isRecording = true;

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access your microphone. Please check permissions.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  uploadAudioFile(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'voicemessage.webm');

    this.http.post('http://localhost:8080/api/audio/upload', formData, { responseType: 'text' })
      .subscribe({
        next: (fileUrl) => {
          this.newMessage = '[AUDIO]' + fileUrl;
          this.sendMessage(); // Sends the audio using our Optimistic UI function
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Failed to upload voice message.');
        }
      });
  }

  getAudioUrl(content: string): string {
    const path = content.replace('[AUDIO]', '');
    return 'http://localhost:8080' + path;
  }

  // --- UTILITY & CLEANUP --- //

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }, 50);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService.disconnect();
    }
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.endVideoCall();
    if (isPlatformBrowser(this.platformId)) {
      this.chatService.disconnect();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
