import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterClientComponent } from './components/register-client.component';
import { RegisterExpertComponent } from './components/register-expert.component';
import { AdminHomeComponent } from './components/admin-home.component';
import { UserListComponent } from './components/user-list.component';
import { AddUserComponent } from './components/add-user.component';
import { EditUserComponent } from './components/edit-user.component';
import { UserDetailsComponent } from './components/user-details.component';
import { ManageSkillsComponent } from './components/manage-skills.component';
import { AddSkillComponent } from './components/add-skill.component';
import { EditSkillComponent } from './components/edit-skill.component';
import { SkillDetailsComponent } from './components/skill-details.component';
import { ProfileComponent } from './components/profile.component';
import { ChatComponent } from './components/chat.component';
import { adminGuard, authGuard } from './components/auth.guard';

export const routes: Routes = [
  // --- Public Routes ---
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/client', component: RegisterClientComponent },
  { path: 'register/expert', component: RegisterExpertComponent },

  // --- Admin Routes ---
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'user-details/:id', component: UserDetailsComponent },
      { path: 'manage-skills', component: ManageSkillsComponent },
      { path: 'add-skill', component: AddSkillComponent },
      { path: 'edit-skill/:id', component: EditSkillComponent },
      { path: 'skill-details/:id', component: SkillDetailsComponent },
    ]
  },

  // --- User Features (Protected) ---
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  // ✅ ADDED CHAT ROUTE HERE
  {
    path: 'chat/:username',
    component: ChatComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },

  // Fallback
  { path: '**', redirectTo: 'home' }
];
