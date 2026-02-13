package com.example.skillsh.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    @Id @GeneratedValue
    private Long id;

    private String text;

    private LocalDate date;

    @ManyToOne
    private User author;

    @ManyToOne
    private Review review;

    // Getters/Setters
}
