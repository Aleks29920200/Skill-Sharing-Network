package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter 
@Setter
@Table(name = "offer_categories")
@NoArgsConstructor
public class OfferCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToMany(mappedBy = "categories")
    private Set<ServiceOffer> offers = new HashSet<>();

    public OfferCategory(String name) {
        this.name = name;
    }
}
