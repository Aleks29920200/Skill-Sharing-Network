package com.example.skillsh.configuration;

import com.example.skillsh.repository.UserRepo;
import com.example.skillsh.web.SkillSharingUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().and().cors().and().authorizeRequests().
                requestMatchers("/index","/register","/login","oauth2/authorization/facebook").permitAll().
                requestMatchers("/search/**").permitAll().
                requestMatchers("/home").fullyAuthenticated().
                requestMatchers("/logout","/chatting","/videochat").authenticated().
                requestMatchers("/").denyAll().
                and()
                .formLogin()
                .loginPage("/login")
                .usernameParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
                .passwordParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_PASSWORD_KEY)
                .defaultSuccessUrl("/home", true)
                .failureUrl("/login?error=true").and()
                .oauth2Login()
                .loginPage("/login")
                .defaultSuccessUrl("/facebookLogin", true)
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index")
                .clearAuthentication(true);
      return httpSecurity.build();
    }
    @Bean
    public UserDetailsService userDetailsService(UserRepo userRepository) {
        return new SkillSharingUserDetailsService(userRepository);
    }
}
