import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-expert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 500px;">

      <h3 class="text-center mb-4">Create Account (Expert)</h3>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" formControlName="username" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input type="text" formControlName="firstName" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input type="text" formControlName="lastName" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" formControlName="email" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" formControlName="password" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Category of Skill</label>
          <input type="text" formControlName="categoryOfSkill" class="form-control" placeholder="e.g. IT, plumbing">
        </div>

        <div class="mb-3">
          <label class="form-label">Profile Photo</label>
          <input type="file" (change)="onFileSelected($event)" class="form-control">
        </div>

        <button type="submit" [disabled]="registerForm.invalid || !selectedFile" class="btn btn-success w-100">
          Register Expert
        </button>

      </form>
    </div>
  </div>`
})
export class RegisterExpertComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      categoryOfSkill: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.selectedFile) return;

    const formData = new FormData();
    Object.keys(this.registerForm.value).forEach(key => {
      formData.append(key, this.registerForm.get(key)?.value);
    });

    // ✅ Correct parameter name
    formData.append('photoUrl', this.selectedFile);

    this.authService.registerExpert(formData).subscribe({
      next: () => {
        alert('Expert registered! Login now.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed')
    });
  }
}
