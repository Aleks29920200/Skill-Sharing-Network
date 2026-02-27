// src/app/components/admin/user-management/user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';
import {UserDTO} from '../models/dtos.model';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="admin-panel">
      <h2>User Management</h2>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button (click)="editUser(user)">Edit</button>
            <button (click)="deleteUser(user.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div *ngIf="selectedUser" class="modal">
        <h3>Edit {{ selectedUser.username }}</h3>
        <input [(ngModel)]="selectedUser.email">
        <div *ngIf="selectedUser"> <h3>Edit {{ selectedUser.username }}</h3>
          <input [(ngModel)]="selectedUser.email" placeholder="Email">
        </div>
        <button (click)="saveUser()">Save</button>
        <button (click)="selectedUser = null">Cancel</button>
      </div>
    </div>
  `,
  imports: [
    FormsModule,CommonModule
  ],
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .btn-delete {
      color: red;
    }

    .modal {
      position: fixed;
      top: 20%;
      left: 30%;
      background: white;
      padding: 20px;
      border: 1px solid black;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  users: UserDTO[] = [];
  selectedUser: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Refresh list
      });
    }
  }

  editUser(user: UserDTO) {
    // Clone the user to avoid editing the table row directly before saving
    this.selectedUser = { ...user };
  }


  getImageSrc(base64: string): string {
    return base64 ? `data:image/jpeg;base64,${base64}` : 'assets/default-avatar.png';
  }
  saveUser() {
    if (this.selectedUser && this.selectedUser.id) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.selectedUser = null;
        this.loadUsers();
      });
    }
  }
}
