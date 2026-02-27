import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from '../services/auth.service'; // Required for routerLink in HTML


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    RouterLink // <--- Essential because your HTML uses <a routerLink="...">
  ],
  template: `<div class="min-h-screen flex flex-col bg-gray-100">
    <nav class="bg-white shadow-lg p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/home" class="text-2xl font-bold text-gray-800 no-underline">SkillSharing Admin</a>
        <div class="flex items-center space-x-4">
          <a routerLink="/admin/add-skill" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg no-underline">Add Skill</a>
          <a routerLink="/admin/users" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg no-underline">All Users</a>
          <button (click)="logout()" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">Logout</button>
        </div>
      </div>
    </nav>

    <main class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to the Admin Panel</h1>
        <p class="text-gray-600 text-lg mb-8">Manage users, skills, and other application settings from this central dashboard.</p>

        <div class="flex justify-center space-x-4">
          <a routerLink="/admin/users" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105 no-underline">
            Manage Users
          </a>
          <a routerLink="/admin/add-skill" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105 no-underline">
            Add New Skill
          </a>
        </div>
      </div>
    </main>
  </div>
  `
})
export class AdminHomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // --- THIS FIXES THE ERROR ---
  logout() {
    this.authService.logout(); // Clears session/token
    this.router.navigate(['/login']); // Redirects to login page
  }
}
