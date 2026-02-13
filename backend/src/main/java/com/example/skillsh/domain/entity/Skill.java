package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="skills")
public class Skill {
    @Id
    @Column(name="skill_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String category;
    private String tag;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_skills", joinColumns = {
            @JoinColumn(name = "user_id")},
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private List<User> createdBy;

    public Skill() {
        createdBy=new ArrayList<>();
    }
}
