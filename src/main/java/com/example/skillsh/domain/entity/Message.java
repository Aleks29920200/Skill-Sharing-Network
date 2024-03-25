package com.example.skillsh.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ValueGenerationType;
import org.hibernate.id.UUIDGenerator;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name="messages")
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "VARCHAR(255)")
    private String id;
    private String sender;
    private String receiver;
    private String chatId;
    @Column(columnDefinition = "TEXT")
    private String content;
    private Timestamp timestamp;
    private Boolean isRead;
}
