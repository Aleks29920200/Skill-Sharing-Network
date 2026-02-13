package com.example.skillsh.services.appointment;


import com.example.skillsh.domain.dto.appointment.AddAppointment;
import com.example.skillsh.domain.entity.Appointment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppointmentService{
void addAppointment(AddAppointment addAppointment);


    void removeAppointment(AddAppointment appointment);

    List<Appointment> getAllAppointments();
}

