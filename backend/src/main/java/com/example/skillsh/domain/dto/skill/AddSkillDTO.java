package com.example.skillsh.domain.dto.skill;


import com.example.skillsh.domain.entity.enums.CategoryType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddSkillDTO {
    @Column(length = 50)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Enumerated(value= EnumType.STRING)
    private CategoryType category;
    @Column(length = 60)
    private String tag;
}
