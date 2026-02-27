import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {UserProfile} from '../models/user-profile.dto';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `<div class="container py-5" *ngIf="userProfile">
    <div class="row justify-content-center">

      <div class="col-md-4 text-center mb-4">
        <div class="card shadow-sm p-4">

          <img [src]="userProfile.photoUrl ? 'data:image/jpeg;base64,' + userProfile.photoUrl : 'assets/default-avatar.png'"
               class="rounded-circle mx-auto mb-3"
               style="width: 150px; height: 150px; object-fit: cover;">

          <h3>{{ userProfile.firstName }} {{ userProfile.lastName }}</h3>
          <p class="text-muted">{{ userProfile.username }}</p>

          <span class="badge bg-info text-dark mb-3">
          {{ userProfile.skill?.category || 'User' }}
        </span>

          <div class="d-flex justify-content-center gap-2">
            <button *ngIf="userProfile.username !== currentUser"
                    [routerLink]="['/chat', userProfile.username]"
                    class="btn btn-primary">
              Message
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-8">

        <div class="card shadow-sm p-4 mb-4">
          <h5 class="fw-bold text-primary">About</h5>
          <p>
            {{ userProfile.skill?.description || userProfile.bio || 'No bio provided.' }}
          </p>
        </div>

        <div class="card shadow-sm p-4">
          <h5 class="fw-bold text-primary mb-3">
            Reviews ({{ userProfile.reviews?.length || 0 }})
          </h5>

          <div *ngFor="let review of userProfile.reviews" class="border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between">
              <strong>{{ review.authorName || 'Anonymous' }}</strong>
              <small class="text-muted">{{ review.created | date:'mediumDate' }}</small>
            </div>
            <p class="mb-0">{{ review.content }}</p>
          </div>

          <div *ngIf="!userProfile.reviews || userProfile.reviews.length === 0" class="text-center text-muted">
            No reviews yet. Be the first to leave one!
          </div>

          <div *ngIf="currentUser && userProfile.username !== currentUser" class="mt-4 pt-3 border-top">
            <h6>Leave a Review:</h6>
            <textarea [(ngModel)]="newReviewContent" class="form-control my-2" rows="3" placeholder="Write your experience..."></textarea>
            <button (click)="submitReview()" [disabled]="!newReviewContent.trim()" class="btn btn-success w-100">
              Submit Review
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div *ngIf="!userProfile" class="container py-5 text-center">
    <p>Loading profile...</p>
  </div>
  `
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  newReviewContent: string = '';
  currentUser: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUsername();
  }

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');

    // SAFETY CHECK: Ensure it's not "undefined" and is a valid number
    if (userIdParam && userIdParam !== 'undefined' && !isNaN(Number(userIdParam))) {
      this.loadProfile(Number(userIdParam));
    } else {
      console.warn('Invalid User ID in URL:', userIdParam);
      this.isLoading = false;
      // You can inject the Router in your constructor and uncomment this to redirect them:
      // this.router.navigate(['/']);
    }
  }

  loadProfile(id: number) {
    this.authService.getUserProfile(id).subscribe({
      next: (data) => {
        // UNWRAP DATA: Check if backend sent a map with 'userProfile' inside it
        this.userProfile = data.userProfile ? data.userProfile : data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.isLoading = false;
      }
    });
  }

  submitReview(): void {
    if (!this.newReviewContent.trim() || !this.userProfile) return;

    this.userService.addReview(this.userProfile.id, this.newReviewContent).subscribe({
      next: (newReview) => {
        // Optimistically add the new review to the list so we don't need to refresh
        if (this.userProfile) {
          if (!this.userProfile.reviews) this.userProfile.reviews = [];
          this.userProfile.reviews.push(newReview);
        }
        this.newReviewContent = '';
      },
      error: (err) => alert('Failed to submit review')
    });
  }
}
