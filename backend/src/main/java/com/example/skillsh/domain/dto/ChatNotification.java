package com.example.skillsh.domain.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ChatNotification {
    private String id;
    private String senderId;
    private String recipientId;
    private String repliedPersonName;
    private String previousMessage;
    private String content;
    private String indicator;
}
