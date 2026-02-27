import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {SkillService} from '../services/skill.service';


@Component({
  selector: 'app-edit-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h1 class="text-3xl font-bold text-gray-800">Edit Skill</h1>
          <a routerLink="/admin/manage-skills" class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded transition">&times;</a>
        </div>

        <form [formGroup]="editForm" (ngSubmit)="onSubmit()" *ngIf="!isLoading">
          <div class="mb-4">
             <label class="block text-sm font-medium text-gray-700">Name</label>
             <input type="text" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
          </div>

          <div class="mb-4">
             <label class="block text-sm font-medium text-gray-700">Category</label>
             <input type="text" formControlName="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
             </div>

          <div class="mb-4">
             <label class="block text-sm font-medium text-gray-700">Description</label>
             <textarea formControlName="description" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"></textarea>
          </div>

          <div class="mb-6">
             <label class="block text-sm font-medium text-gray-700">Tag</label>
             <input type="text" formControlName="tag" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
          </div>

          <div class="flex justify-end space-x-2">
             <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EditSkillComponent implements OnInit {
  editForm: FormGroup;
  skillId!: number;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      tag: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.skillId = +id;
      this.skillService.getSkillById(this.skillId).subscribe({
        next: (data) => {
          this.editForm.patchValue(data);
          this.isLoading = false;
        },
        error: (err) => {
          alert('Error loading skill');
          this.router.navigate(['/admin/manage-skills']);
        }
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.skillService.updateSkill(this.skillId, this.editForm.value).subscribe({
        next: () => {
          alert('Skill updated!');
          this.router.navigate(['/admin/manage-skills']);
        },
        error: (err) => alert('Update failed')
      });
    }
  }
}
