package com.example.skillsh.services;


import com.example.skillsh.domain.dto.AddAppointment;
import org.springframework.stereotype.Service;

@Service
public interface AppointmentService{
void addAppointment(AddAppointment addAppointment);
}
