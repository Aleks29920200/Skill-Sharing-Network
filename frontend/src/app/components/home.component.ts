import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SearchService } from '../services/search.service';
import { UserDTO } from '../models/dtos.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-10">

      <div class="bg-indigo-600 text-white py-16 px-4 text-center shadow-md">
        <h1 class="text-4xl font-bold mb-4">Find the Perfect Expert</h1>
        <div class="max-w-xl mx-auto flex gap-2">
          <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="performSearch(searchQuery)"
            placeholder="Search by name or skill..." class="flex-grow p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          <button (click)="performSearch(searchQuery)" class="bg-yellow-400 text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition">
            Search
          </button>
        </div>
      </div>

      <div class="container mx-auto px-4 mt-8">

        <div *ngIf="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="mt-2 text-gray-500">Finding experts...</p>
        </div>

        <div *ngIf="!isLoading && users.length === 0" class="text-center py-12">
           <p class="text-gray-500">No experts found.</p>
        </div>

        <div *ngIf="!isLoading && users.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let user of users" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-2xl transition duration-300">

            <div class="h-48 bg-gray-200 relative">
               <img [src]="getImageUrl(user.photoUrl)"
                    class="w-full h-full object-cover cursor-pointer"
                    [routerLink]="['/profile', user.id]"
                    alt="User Photo">

               <div *ngIf="user.role && user.role.length > 0"
                    class="absolute top-0 right-0 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 m-2 rounded-full shadow">
                 {{ getRoleName(user) }}
               </div>
            </div>

            <div class="p-6 flex-grow">
              <h3 class="text-xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600"
                  [routerLink]="['/profile', user.id]">
                  {{ user.firstName }} {{ user.lastName }}
              </h3>
              <p class="text-indigo-500 font-medium text-sm mb-2">{{ user.username }}</p>

              <div class="mt-3 flex flex-wrap gap-2">
                 <ng-container *ngIf="user.createdBy && user.createdBy.length > 0">
                   <span *ngFor="let skill of user.createdBy" class="text-[10px] uppercase font-bold text-white px-2 py-1 rounded bg-indigo-400">
                     {{ skill.category }}
                   </span>
                 </ng-container>
              </div>
            </div>

            <div class="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
              <div style="font-size: 10px; color: red;">{{ user | json }}</div>
               <a [routerLink]="['/profile', user.id]"
                  class="flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition">
                 Profile
               </a>

               <button (click)="goToChat(user)"
                       class="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                 </svg>
                 Message
               </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  users: UserDTO[] = [];
  isLoading: boolean = false;

  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.performSearch('');
  }

  // ✅ ROBUST NAVIGATION METHOD
  goToChat(userObj: any) {
    // 1. Prefer Username (since Chat uses usernames anyway)
    const target = userObj.username;

    if (!target) {
      console.error("User object:", userObj);
      alert("Error: Missing username!");
      return;
    }

    // 2. Navigate to /chat/alex
    this.router.navigate(['/chat', target]);
  }

  getImageUrl(fileEntity: any): SafeUrl {
    // Robust check for different backend naming conventions
    if (fileEntity && (fileEntity.fileData || fileEntity.data || fileEntity.picByte)) {
      const base64Data = fileEntity.fileData || fileEntity.data || fileEntity.picByte;
      const mimeType = fileEntity.contentType || 'image/jpeg';
      const prefix = `data:${mimeType};base64,`;
      const finalUrl = base64Data.startsWith('data:') ? base64Data : prefix + base64Data;
      return this.sanitizer.bypassSecurityTrustUrl(finalUrl);
    }
    return 'assets/default-user.png';
  }

  performSearch(query: string) {
    this.isLoading = true;
    this.searchService.searchByKeyword(query).subscribe({
      next: (data) => {
        this.users = data || [];
        this.isLoading = false;
        if (this.cdr) this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        if (this.cdr) this.cdr.detectChanges();
      }
    });
  }

  getRoleName(user: any): string {
    if (user && user.roles && user.roles.length > 0) {
      const role = user.roles[0].name || user.roles[0];
      return role.replace('ROLE_', '').toLowerCase();
    }
    return 'expert';
  }
}
