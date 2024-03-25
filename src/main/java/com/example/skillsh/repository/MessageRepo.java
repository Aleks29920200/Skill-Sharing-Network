package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<Message, String> {
List<Message> findByChatId(String chatId);
}
