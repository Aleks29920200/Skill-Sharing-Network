package com.example.skillsh.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessageDto {
        private String id;
        private String chatId;
        private String senderId;
        private String recipientId;
        private String content;
}
