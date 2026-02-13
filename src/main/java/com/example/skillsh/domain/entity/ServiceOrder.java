package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_orders")
@Data
public class ServiceOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false)
    private ServiceOffer offer;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId; // Used to link to Stripe PI

    private String status; // PENDING, PAID, FAILED, COMPLETED, CANCELLED

    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

    private String currency;

    @Column(name = "order_date")
    private LocalDateTime orderDate;
}