package com.example.skillsh.util;

import com.example.skillsh.services.SkillServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ConsoleRunner implements CommandLineRunner {
    private SkillServiceImpl skillService;
     @Autowired
    public ConsoleRunner(SkillServiceImpl skillService) {
        this.skillService = skillService;
    }
    @Override
    public void run(String... args) throws Exception {
        skillService.seedCategories();
    }
}
