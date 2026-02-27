import { User } from './user.model';
import { Skill } from './skill.model';

export interface Review {
  id: number;
  authorName: string;
  content: string;
  created: string; // or Date
}

export interface UserProfile extends User {
  skill?: Skill;   // The expert's skill details
  reviews?: Review[];
}
