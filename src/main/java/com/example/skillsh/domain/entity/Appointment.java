package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="appointments")
@NoArgsConstructor
public class Appointment {
    @Id
    @Column(name="appointment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User requester;
    @OneToOne
    private User provider;
    @OneToOne
    private Skill skill;
    private LocalDateTime dateOfAppointment;
    private String name;
    @Enumerated(EnumType.STRING)
    private StatusName status;
}
