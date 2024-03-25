package com.example.skillsh.domain.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ChatNotification {
    private String id;
    private String senderId;
    private String recipientId;
    private String content;



}
