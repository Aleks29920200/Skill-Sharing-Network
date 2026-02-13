package com.example.skillsh.domain.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Table(name = "offer_features")
@NoArgsConstructor
public class OfferFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id", nullable = false)
    private ServiceOffer offer;

    public OfferFeature(String name, ServiceOffer offer) {
        this.name = name;
        this.offer = offer;
    }
}
