package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SkillRepo extends JpaRepository<Skill, Long> {
    Skill getSkillByCategory(String category);
    Skill getSkillByName(String name);
}
