import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillDTO, AddSkillDTO } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  // Базирано на SkillController: @RequestMapping("/api/admin/skills")
  private apiUrl = 'http://localhost:8080/api/admin/skills';

  constructor(private http: HttpClient) {}

  // @GetMapping
  getAllSkills(): Observable<SkillDTO[]> {
    return this.http.get<SkillDTO[]>(this.apiUrl);
  }

  // @GetMapping("/{id}")
  getSkillById(id: number): Observable<SkillDTO> {
    return this.http.get<SkillDTO>(`${this.apiUrl}/${id}`);
  }

  // @PostMapping("/add")
  addSkill(skill: AddSkillDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, skill, { responseType: 'text' });
  }

  // @PutMapping("/{id}")
  updateSkill(id: number, skill: SkillDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, skill, { responseType: 'text' });
  }

  // @DeleteMapping("/{id}")
  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
