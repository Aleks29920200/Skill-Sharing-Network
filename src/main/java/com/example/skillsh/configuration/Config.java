package com.example.skillsh.configuration;

import com.example.skillsh.domain.dto.AddAppointment;
import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.view.UserView;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class Config {

    @Bean
    public RegisterDto registerDto(){
        return new RegisterDto();
    }
    @Bean
    public AddAppointment addAppointment(){
        return new AddAppointment();
    }

    @Bean
    public ModelMapper mapper(){
        return new ModelMapper();
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
