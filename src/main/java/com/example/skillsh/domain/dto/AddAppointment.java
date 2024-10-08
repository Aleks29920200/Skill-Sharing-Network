package com.example.skillsh.domain.dto;

import com.example.skillsh.domain.entity.StatusName;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddAppointment {
    private String name;
    private LocalDateTime dateOfAppointment;
}
