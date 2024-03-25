package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="endorsements")
@NoArgsConstructor
public class Endorsement {
    @Id
    @Column(name="endorsement_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User endorisingUser;
    @OneToOne
    private User endorsedUser;
    @OneToOne
    private Skill skill;

    private String endorsementText;
    @FutureOrPresent
    private LocalDate dateOfEndorsement;

}
