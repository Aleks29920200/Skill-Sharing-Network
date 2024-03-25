package com.example.skillsh.web;

import com.example.skillsh.domain.dto.AddAppointment;
import com.example.skillsh.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AppointmentController {
    private AppointmentService appointmentService;
@Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/addAppointment.html")
    public String addAppoint(){
        return "addAppointment";
    }
    @PostMapping("/addAppointment.html")
    public String addAppointment(@Valid AddAppointment addAppointment, RedirectAttributes redirectAttributes, BindingResult bindingResult, ModelAndView model){
        if(bindingResult.hasErrors()){
            redirectAttributes
                    .addFlashAttribute("addAppointment", addAppointment)
                    .addFlashAttribute("org.springframework.validation.BindingResult.addAppointment", bindingResult);

            return "redirect:/addAppointment";
        }
        appointmentService.addAppointment(addAppointment);
        return "redirect:/calendar";
    }
    @ModelAttribute(name="addAppointment")
    public AddAppointment addAppointment(){
    return new AddAppointment();
    }
}
