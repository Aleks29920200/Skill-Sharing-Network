package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.SkillRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRequestRepo extends JpaRepository<SkillRequest, Long> {

}
