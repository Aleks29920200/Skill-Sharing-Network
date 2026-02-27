import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {SkillDTO} from '../models/skill.model';
import {SkillService} from '../services/skill.service';


@Component({
  selector: 'app-skill-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4" *ngIf="skill">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h1 class="text-3xl font-bold text-gray-800">{{ skill.name }}</h1>
          <a routerLink="/admin/manage-skills" class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded">&times;</a>
        </div>

        <div class="space-y-4">
           <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-500">Category</p>
              <p class="text-gray-900 font-semibold text-lg">{{ skill.category }}</p>
           </div>

           <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-500">Description</p>
              <p class="text-gray-900 font-semibold text-lg">{{ skill.description }}</p>
           </div>

           <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-500">Tag</p>
              <p class="text-gray-900 font-semibold text-lg">{{ skill.tag || 'No tag' }}</p>
           </div>
        </div>

        <div class="mt-6 flex justify-end">
           <a routerLink="/admin/manage-skills" class="text-indigo-600 hover:text-indigo-800 font-medium">Back to List</a>
        </div>
      </div>
    </div>
  `
})
export class SkillDetailsComponent implements OnInit {
  skill: SkillDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.skillService.getSkillById(+id).subscribe(data => this.skill = data);
    }
  }
}
