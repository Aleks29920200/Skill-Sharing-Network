package com.example.skillsh.domain.dto.skill;

import com.example.skillsh.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SkillDto {
    private String name;
    private String category;
    private List<User> createdBy;
}
