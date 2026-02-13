package com.example.skillsh.web;

import com.example.skillsh.services.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for managing service offers.
 * All operations concerning offer creation, update, and deletion should be secured
 * to ensure only the authenticated seller can modify their own offers.
 */
@RestController
@RequestMapping("/api/offers")
public class ServiceOfferController {

    private final ModelMapper mapper;
    private final UserService userService; // Made final

    @Autowired
    public ServiceOfferController(ModelMapper mapper, UserService userService) {
        this.mapper = mapper;
        this.userService = userService;
    }

}