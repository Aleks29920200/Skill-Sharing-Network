package com.example.skillsh.web;

import com.example.skillsh.domain.entity.ServiceOffer;
import com.example.skillsh.domain.entity.ServiceOrder;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.repository.ServiceOfferRepository;
import com.example.skillsh.repository.ServiceOrderRepository;
import com.example.skillsh.repository.UserRepo;
import com.example.skillsh.services.payment.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    private final StripeService stripeService;
    private final UserRepo userRepository;
    private final ServiceOfferRepository offerRepository;
    private final ServiceOrderRepository orderRepository;

    @Autowired
    public PaymentController(StripeService stripeService,
                             UserRepo userRepository,
                             ServiceOfferRepository offerRepository,
                             ServiceOrderRepository orderRepository) {
        this.stripeService = stripeService;
        this.userRepository = userRepository;
        this.offerRepository = offerRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody PaymentRequest request) throws StripeException {
        // 1. Validate and Fetch Entities
        User buyer = userRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buyer not found"));

        ServiceOffer offer = offerRepository.findById(request.getOfferId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Offer not found"));

        // 2. Calculate Amount in Cents (Stripe requires Long integers for cents)
        // Example: 10.50 USD -> 1050 cents
        BigDecimal price = offer.getPrice();
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid offer price");
        }

        Long amountInCents = price.multiply(BigDecimal.valueOf(100)).longValue();
        String currency = "usd";

        // 3. Create and Save PENDING Service Order
        ServiceOrder newOrder = new ServiceOrder();
        newOrder.setBuyer(buyer);
        newOrder.setOffer(offer);
        newOrder.setAmount(price); // Save original BigDecimal amount
        newOrder.setCurrency(currency);
        newOrder.setOrderDate(LocalDateTime.now());
        newOrder.setStatus("PENDING"); // Initial status before payment

        ServiceOrder savedOrder = orderRepository.save(newOrder);

        // 4. Create Stripe Payment Intent
        // We attach the internal Order ID to the metadata so the Webhook can update it later.
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .putMetadata("order_id", String.valueOf(savedOrder.getId()))
                .putMetadata("offer_name", offer.getName())
                .putMetadata("buyer_id", String.valueOf(buyer.getId()))
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        log.info("Payment intent created for Order ID {}: {}", savedOrder.getId(), intent.getId());

        // 5. Update Service Order with Stripe Payment Intent ID
        // This links the specific Stripe transaction to our database record
        savedOrder.setStripePaymentIntentId(intent.getId());
        orderRepository.save(savedOrder);

        // 6. Return Client Secret to Frontend (used to render Stripe Elements)
        return Map.of(
                "clientSecret", intent.getClientSecret(),
                "orderId", savedOrder.getId()
        );
    }

    // Simple DTO for the incoming request
    @Data
    public static class PaymentRequest {
        private Long buyerId;
        private Long offerId;
    }
}