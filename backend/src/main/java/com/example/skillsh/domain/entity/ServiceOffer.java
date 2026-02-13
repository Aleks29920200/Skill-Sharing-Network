package com.example.skillsh.domain.entity;

import com.example.skillsh.domain.entity.enums.OfferStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "service_offers")
@Data
public class ServiceOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Use BigDecimal for currency to avoid floating point issues
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "offer_to_category", // Name of the intermediate table
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<OfferCategory> categories = new HashSet<>();
    // Assuming every offer is created by a user/seller
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;
@Enumerated(EnumType.STRING)
    private OfferStatus status;
}