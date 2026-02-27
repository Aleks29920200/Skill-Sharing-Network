import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Appointment} from '../models/appointment.model';
import {AppointmentService} from '../services/appointment.service';


@Component({
  selector: 'app-calendar-view', // <--- CHANGED from app-calendar
  standalone: true,
  imports: [CommonModule],
  template: `<div class="calendar-container">
    <div class="calendar-header">
      <div class="month-navigation">
        <span (click)="prevMonth()" class="cursor-pointer text-2xl">&lt;</span>
        <span class="text-xl font-bold">{{ monthNames[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}</span>
        <span (click)="nextMonth()" class="cursor-pointer text-2xl">&gt;</span>
      </div>
    </div>

    <div class="calendar-grid grid grid-cols-7 gap-2 p-4">
      <div *ngFor="let day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" class="font-bold text-center">
        {{ day }}
      </div>

      <div *ngFor="let empty of emptySlots" class="p-4"></div>

      <div *ngFor="let day of daysInMonth" class="border rounded p-4 h-24 relative hover:bg-blue-50">
        <span class="absolute top-1 left-1 font-semibold">{{ day }}</span>

        <div *ngIf="hasAppointment(day)" class="mt-4 text-xs bg-blue-500 text-white rounded p-1">
          Meeting
        </div>
      </div>
    </div>
  </div>
  `
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  daysInMonth: number[] = [];
  emptySlots: number[] = [];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.renderCalendar();
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => this.appointments = data,
      error: (err) => console.error('Error loading appointments', err)
    });
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    this.emptySlots = Array(firstDay).fill(0);
    this.daysInMonth = Array.from({length: lastDate}, (_, i) => i + 1);
  }

  hasAppointment(day: number): boolean {
    // Check if any appointment matches the current year, month, and day
    return this.appointments.some(apt => {
      const d = new Date(apt.dateOfAppointment);
      return d.getDate() === day &&
        d.getMonth() === this.currentDate.getMonth() &&
        d.getFullYear() === this.currentDate.getFullYear();
    });
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }
}
