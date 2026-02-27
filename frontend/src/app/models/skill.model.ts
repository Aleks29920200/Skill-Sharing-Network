export interface SkillDTO {
  id: number;
  name: string;
  category: string;
  description: string;
  tag?: string;
}

// За добавяне (AddSkillDTO)
export interface AddSkillDTO {
  name: string;
  category: string;
  description: string;
  tag?: string;
}
export interface Skill {
  id?: number; // Optional because new skills don't have an ID yet
  name: string;
  category: string;
  description: string;
  tag?: string;
}
