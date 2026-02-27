import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {SkillDTO} from '../models/skill.model';
import {SkillService} from '../services/skill.service';


@Component({
  selector: 'app-manage-skills',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">

        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h1 class="text-3xl font-bold text-gray-800">Manage Skills</h1>
          <a routerLink="/admin" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors">
            Back to Dashboard
          </a>
        </div>

        <div class="flex justify-end mb-4">
          <a routerLink="/admin/add-skill" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors">
            + Add New Skill
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Name</th>
                <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th class="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr *ngFor="let skill of skills" class="hover:bg-gray-50 transition-colors">
                <td class="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ skill.name }}</td>
                <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{{ skill.category }}</td>
                <td class="py-4 px-6 text-sm text-gray-500 truncate max-w-xs">{{ skill.description }}</td>
                <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{{ skill.tag || '-' }}</td>
                <td class="py-4 px-6 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <a [routerLink]="['/admin/skill-details', skill.id]" class="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded text-xs">Details</a>
                  <a [routerLink]="['/admin/edit-skill', skill.id]" class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs">Edit</a>
                  <button (click)="deleteSkill(skill.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs">Remove</button>
                </td>
              </tr>
              <tr *ngIf="skills.length === 0">
                <td colspan="5" class="text-center py-4 text-gray-500">No skills found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ManageSkillsComponent implements OnInit {
  skills: SkillDTO[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.skillService.getAllSkills().subscribe({
      next: (data) => this.skills = data,
      error: (err) => console.error('Error loading skills', err)
    });
  }

  deleteSkill(id: number) {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => {
          this.skills = this.skills.filter(s => s.id !== id);
        },
        error: (err) => alert('Failed to delete skill')
      });
    }
  }
}
