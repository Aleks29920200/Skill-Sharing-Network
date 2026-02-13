package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="skills_requests")
@NoArgsConstructor
public class SkillRequest {
    @Id
    @Column(name="skill_request_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User requestingUser;
    @OneToOne
    private Skill skill;
    @OneToOne
    private Message message;

}
