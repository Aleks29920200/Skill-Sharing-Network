package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Entity
@Getter
@Setter
@Table(name="users")
@NoArgsConstructor
public class User{
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String password;
    private String lastName;
    private String address;
    private String picture;
    @Column(columnDefinition = "TEXT")
    private String bio;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Endorsement> endorsement;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Review> review;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Appointment>appointments;
    @Enumerated(EnumType.STRING)
    private Status activity;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> role;
}
