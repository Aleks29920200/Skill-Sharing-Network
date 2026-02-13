package com.example.skillsh.services;

import com.example.skillsh.domain.entity.Skill;
import org.springframework.stereotype.Service;

@Service
public interface SkillService{
    Skill getSkillByCategory(String category);
    void seedCategories();

    Skill getSkillByName(String name);
}
