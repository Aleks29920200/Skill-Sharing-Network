import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {SkillService} from '../services/skill.service';


@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h1 class="text-3xl font-bold text-gray-800">Add New Skill</h1>
          <a routerLink="/admin/manage-skills" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</a>
        </div>

        <form [formGroup]="skillForm" (ngSubmit)="onSubmit()">

          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Skill Name</label>
            <input type="text" formControlName="name" placeholder="e.g., Java Programming"
                   class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm">
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Category</label>
            <select formControlName="category" class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              <option value="" disabled>Select Category</option>
              <option value="IT">IT</option>
              <option value="Medicine">Medicine</option>
              <option value="Archeology">Archeology</option>
              <option value="Transportation">Transportation</option>
              <option value="Construction">Construction</option>
            </select>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea formControlName="description" rows="4" placeholder="Provide a detailed description..."
                      class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 shadow-sm"></textarea>
          </div>

           <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Tag (Optional)</label>
            <input type="text" formControlName="tag" placeholder="e.g., #coding"
                   class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm">
          </div>

          <div class="flex justify-center">
            <button type="submit" [disabled]="skillForm.invalid"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors transform hover:scale-105">
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddSkillComponent {
  skillForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private router: Router
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      tag: ['']
    });
  }

  onSubmit() {
    if (this.skillForm.valid) {
      this.skillService.addSkill(this.skillForm.value).subscribe({
        next: () => {
          alert('Skill added successfully!');
          this.router.navigate(['/admin/manage-skills']);
        },
        error: (err) => alert('Error adding skill.')
      });
    }
  }
}
