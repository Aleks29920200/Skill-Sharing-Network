package com.example.skillsh.services;

import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService{

    void registerUser(RegisterDto registerDto);


    void saveUser(User user);

    void disconnect(User user);

    List<User> findConnectedUsers();

    Optional<User> findUserByUsername(String username);

    List<User> users();
}

