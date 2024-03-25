package com.example.skillsh.domain.dto;

import com.example.skillsh.domain.entity.StatusName;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class AddAppointment {
    private String location;
    private LocalDateTime dateOfAppointment;
    private StatusName status;
}
