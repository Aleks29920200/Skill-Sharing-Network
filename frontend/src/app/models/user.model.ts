// src/app/models/user.model.ts
import { Review } from './review.model';
import { Appointment } from './appointment.model';
import { Role } from './role.model';
import { Skill } from './skill.model';
import { FileEntity } from './file-entity.model';
import { UserStatus } from './enums.model';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  picture: string; // Simple URL string if used
  bio?: string;

  // Relationships
  review: Review[];
  appointments: Appointment[];
  activity: UserStatus;
  role: Role[];

  // In Java this was named 'photoUrl' but typed as 'FileEntity'
  photoUrl: FileEntity;

  blockedUsers: User[];
  createdBy: Skill[];
}
