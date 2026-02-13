package com.example.skillsh.services;

import com.example.skillsh.domain.entity.Message;
import org.springframework.stereotype.Service;

@Service
public interface MessageService{

    Message save(Message chatMessage);

    Object findChatMessages(String senderId, String recipientId);

    Message deleteMessage(Message delMessage);
}
