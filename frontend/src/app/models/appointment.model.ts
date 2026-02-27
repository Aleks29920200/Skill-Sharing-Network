// src/app/models/appointment.model.ts
import { User } from './user.model';
import { Skill } from './skill.model';
import { AppointmentStatus } from './enums.model';

export interface Appointment {
  id: number;
  requester: User;
  provider: User;
  skill: Skill;
  dateOfAppointment: Date; // LocalDateTime -> ISO String (e.g. "2023-10-25T14:30:00")
  name: string;
  title:string;
  status: AppointmentStatus;
}
