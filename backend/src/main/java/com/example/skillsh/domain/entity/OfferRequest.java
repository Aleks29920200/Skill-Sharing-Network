package com.example.skillsh.domain.entity;

import com.example.skillsh.domain.entity.enums.OfferStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OfferRequest {
    private String title;
    private String description;
    private double price;
    private double originalPrice;
    private Integer quantityAvailable;
    private OfferStatus status; // e.g., DRAFT, ACTIVE

    // Relationships managed by the form/client
    private Long sellerId;
    private List<String> featureNames;
    private List<Long> categoryIds;

    // For discounts
    private Double discountPercentage;
    private LocalDateTime discountExpiration;

}
