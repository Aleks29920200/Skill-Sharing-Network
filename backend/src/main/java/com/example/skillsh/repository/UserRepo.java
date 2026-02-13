package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findUserByUsername(String username);

    List<User> findAllByActivity(Status online);
}

