package com.example.skillsh.services.skill;

import com.example.skillsh.domain.dto.skill.AddSkillDTO;
import com.example.skillsh.domain.entity.Skill;
import org.springframework.stereotype.Service;

@Service
public interface SkillService{
    Skill getSkillByCategory(String category);
    void seedCategories();

    Skill getSkillByName(String name);

    void addSkill(AddSkillDTO addSkillDto);

    void updateSkill(Skill updatedSkill);

    void deleteSkill(Long id);
    Skill getSkillById(Long id);
}
