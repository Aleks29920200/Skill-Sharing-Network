import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Appointment} from '../models/appointment.model';
import {AppointmentDTO, AppointmentService} from '../services/appointment.service';


@Component({
  selector: 'app-appointment-list', // <--- Unique selector
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Manage Appointments</h2>

      <div class="mb-6 flex gap-2">
        <input [(ngModel)]="newTitle" placeholder="Client Name/Title" class="border p-2 rounded w-full"/>
        <input type="datetime-local" [(ngModel)]="newDate" class="border p-2 rounded"/>
        <button (click)="addEvent()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
      </div>

      <ul class="space-y-2">
        <li *ngFor="let apt of appointments" class="flex justify-between items-center bg-gray-50 p-3 rounded">
          <span>
            <strong>{{ apt.dateOfAppointment | date:'short' }}</strong> - {{ apt.title }}
          </span>
          <button (click)="removeEvent(apt!)" class="text-red-500 hover:text-red-700">Remove</button>
        </li>
      </ul>

      <div *ngIf="appointments.length === 0" class="text-gray-500 text-center">No upcoming appointments.</div>
    </div>
  `
})
export class AppointmentListComponent implements OnInit {
  appointments: AppointmentDTO[] = [];
  newTitle = '';
  newDate = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => this.appointments = data,
      error: (err) => {
        console.error('Failed to load appointments', err);
        // Prevents the app from crashing entirely
        this.appointments = [];
      }
    });
  }

  // Remove the 'appointment' argument from the function signature
  addEvent() {
    if (!this.newTitle || !this.newDate) return;

    const appointment: AppointmentDTO = {
      dateOfAppointment: new Date(this.newDate),
      title: this.newTitle,
      // Fill required fields with defaults to satisfy TypeScript
      name: this.newTitle,        // Using title as name for now
      status: "PENDING",          // Default status
                 // Placeholder
    };

    this.appointmentService.addAppointment(appointment).subscribe(() => {
      this.loadEvents();
      this.newTitle = '';
      this.newDate = '';
    });
  }

  removeEvent(appointment: AppointmentDTO) {
    this.appointmentService.removeAppointment(appointment).subscribe(() => this.loadEvents());
  }
}
