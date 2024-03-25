package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="reviews")
@NoArgsConstructor
public class Review {
    @Id
    @Column(name="review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User reviewingUser;
    @OneToOne
    private User reviewedUser;
    @Column(columnDefinition = "TEXT")
    private String reviewText;
    private int rating;
    private LocalDate dateOfReview;
}
