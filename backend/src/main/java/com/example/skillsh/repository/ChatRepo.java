package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepo extends JpaRepository<ChatRoom,String> {

     Optional<ChatRoom> findBySenderIdAndAndRecipientId(String senderId, String recipientId);
}
