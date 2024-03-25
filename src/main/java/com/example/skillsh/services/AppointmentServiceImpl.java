package com.example.skillsh.services;

import com.example.skillsh.domain.dto.AddAppointment;
import com.example.skillsh.domain.entity.Appointment;
import com.example.skillsh.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private AppointmentRepo appointmentRepo;
@Autowired
    public AppointmentServiceImpl(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    @Override
    public void addAppointment(AddAppointment addAppointment) {
        Appointment appointment=new Appointment();
        appointment.setLocation(addAppointment.getLocation());
        appointmentRepo.save(appointment);
}
}
