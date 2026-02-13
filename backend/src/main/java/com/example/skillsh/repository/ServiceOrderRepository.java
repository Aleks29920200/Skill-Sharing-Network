package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Long> {
    Optional<ServiceOrder> findByStripePaymentIntentId(String stripePaymentIntentId);

}

