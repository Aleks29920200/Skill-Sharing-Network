package com.example.skillsh.web;

import com.beust.ah.A;
import com.example.skillsh.domain.dto.AddAppointment;
import com.example.skillsh.domain.entity.Appointment;
import com.example.skillsh.services.AppointmentService;
import com.example.skillsh.services.AppointmentServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.BindParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AppointmentController {
    private AppointmentService appointmentService;
    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @GetMapping("/addAppointment")
    public String addAppointment(){
        return "addAppointment";
    }
    @PostMapping("/addAppointment")
    public String addAppointment(@Valid @ModelAttribute AddAppointment addAppointment, BindingResult bindingResult, RedirectAttributes redirectAttributes ){
        if(bindingResult.hasErrors()){
            redirectAttributes
                    .addFlashAttribute("addAppointment",addAppointment)
                    .addFlashAttribute("org.springframework.validation.BindingResult.addAppointment", bindingResult);

            return "redirect:/addAppointment";
        }
        appointmentService.addAppointment(addAppointment);
        return "redirect:/calendar";
    }
    @PostMapping("/remove")
    public String removeEvent(AddAppointment appointment){
        appointmentService.removeAppointment(appointment);
        System.out.println(appointment);
        return "redirect:/calendar";
    }
    @ModelAttribute(name="addAppointment")
    public AddAppointment appointment(){
        return new AddAppointment();
    }
}
