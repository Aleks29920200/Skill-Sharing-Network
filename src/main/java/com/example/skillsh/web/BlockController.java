package com.example.skillsh.web;

import com.example.skillsh.services.user.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/block")
public class BlockController {

    private final UserServiceImpl userService;

    @Autowired
    public BlockController(UserServiceImpl userService) {
        this.userService = userService;
    }


}
