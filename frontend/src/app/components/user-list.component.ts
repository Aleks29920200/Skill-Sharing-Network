import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {UserDTO} from '../models/dtos.model';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'user-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4 text-white p-2 rounded" style="background: #0056b3;">All Users</h2>

      <div class="table-responsive bg-white rounded shadow">
        <table class="table table-hover mb-0">
          <thead class="text-white" style="background: #34ce57;">
          <tr>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>
              <a [routerLink]="['/admin/user-details', user.id]" class="btn btn-info btn-sm me-2 text-white">Details</a>
              <a [routerLink]="['/admin/edit-user', user.id]" class="btn btn-warning btn-sm me-2 text-white">Edit</a>
              <button (click)="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr *ngIf="users.length === 0">
            <td colspan="5" class="text-center">No users found.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `

})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];


  constructor(
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object // <--- Inject Platform ID
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    }
  }

  loadUsers() {
    // Извиква @GetMapping("/admin/all-users")
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users', err)
    });
  }

  deleteUser(id: number) {
    if(confirm('Are you sure?')) {
      // Извиква @DeleteMapping("/admin/remove-user/{id}")
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          alert('User removed successfully');
        },
        error: (err) => alert('Error deleting user')
      });
    }
  }
}
