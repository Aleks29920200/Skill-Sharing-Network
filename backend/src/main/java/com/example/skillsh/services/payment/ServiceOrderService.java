package com.example.skillsh.services.payment;

import com.example.skillsh.domain.entity.ServiceOrder;
import com.example.skillsh.repository.ServiceOrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ServiceOrderService {

    private final ServiceOrderRepository orderRepository;

    public ServiceOrderService(ServiceOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Updates the status of a service order based on its primary key ID.
     * This method is called by the WebHookController upon payment success/failure.
     * * @param orderId The primary key ID of the ServiceOrder (retrieved from Stripe metadata).
     * @param newStatus The new status (e.g., PAID, FAILED).
     */
    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        ServiceOrder order = orderRepository.findById(orderId)
                .orElseThrow(() -> {
                    // This scenario is serious, as it means Stripe sent an event
                    // for an order ID we don't recognize. Log and maybe re-throw if needed.
                    System.err.println("CRITICAL: ServiceOrder not found for ID: " + orderId);
                    // We don't throw ResponseStatusException here as this is an async operation,
                    // but we can log the failure.
                    throw new RuntimeException("ServiceOrder not found for ID: " + orderId);
                });

        // Simple state transition logic
        if (!order.getStatus().equals(newStatus)) {
            order.setStatus(newStatus);
            orderRepository.save(order);
            System.out.println("Order " + orderId + " successfully updated to status: " + newStatus);
        } else {
            System.out.println("Order " + orderId + " is already in status: " + newStatus + ". Skipping update.");
        }
    }

    // An overloaded method to support finding by PaymentIntent ID if metadata wasn't used
    @Transactional
    public void updateOrderStatus(String paymentIntentId, String newStatus) {
        ServiceOrder order = orderRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("ServiceOrder not found for Payment Intent ID: " + paymentIntentId));

        if (!order.getStatus().equals(newStatus)) {
            order.setStatus(newStatus);
            orderRepository.save(order);
            System.out.println("Order for PI " + paymentIntentId + " successfully updated to status: " + newStatus);
        }
    }
}