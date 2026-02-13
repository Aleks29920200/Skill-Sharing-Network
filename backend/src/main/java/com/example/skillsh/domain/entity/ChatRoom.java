package com.example.skillsh.domain.entity;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.websocket.OnOpen;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name="chat_rooms")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
        @Column(name="chat_room_id",nullable = false,unique = true)
        private UUID id;
        private String chatId;
        private String senderId;
        private String recipientId;


}

