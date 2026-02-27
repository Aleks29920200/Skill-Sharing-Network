import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {User} from '../models/user.model';
import {Skill} from '../models/skill.model';
import {AppointmentStatus} from '../models/enums.model';


export interface AppointmentDTO {
  dateOfAppointment: Date;
  name: string;
  title:string;
  status: AppointmentStatus;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  addAppointment(appointment: AppointmentDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/addAppointment`, appointment);
  }

  removeAppointment(appointment: AppointmentDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/removeAppointment`, appointment);
  }
  getAppointments():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/appointments/all`);
  }
  // You will need to add a GET endpoint in Java to return the calendar data as JSON
  getCalendarEvents(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>(`${this.apiUrl}/calendar-events`);
  }
}
