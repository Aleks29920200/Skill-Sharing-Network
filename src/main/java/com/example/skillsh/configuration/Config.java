package com.example.skillsh.configuration;

import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.view.UserView;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.w3c.dom.events.UIEvent;

@Configuration
public class Config {
    @Bean
    public RegisterDto registerDto(){
        return new RegisterDto();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public UserView userView(){
        return new UserView();
    }
}
