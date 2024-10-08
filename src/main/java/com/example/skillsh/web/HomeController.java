package com.example.skillsh.web;

import com.example.skillsh.domain.dto.AddAppointment;
import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.dto.SearchDto;
import com.example.skillsh.domain.dto.SkillDto;
import com.example.skillsh.domain.entity.Role;
import com.example.skillsh.domain.entity.Skill;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.services.SkillServiceImpl;
import com.example.skillsh.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.lang.annotation.Target;
import java.security.Principal;
import java.util.List;

@Controller
public class HomeController {
    private UserService userService;
    private SkillServiceImpl skillService;
    private AppointmentController appointmentController;
    @Autowired
    public HomeController(UserService userService, SkillServiceImpl skillService, AppointmentController appointmentController) {
        this.userService = userService;
        this.skillService = skillService;
        this.appointmentController = appointmentController;
    }
    @GetMapping("/index")
    public ModelAndView index(ModelAndView modelAndView){
        List<SkillDto> skills = skillService.getSkills();
        modelAndView.setViewName("index");
        modelAndView.addObject("skills",skills);
        return modelAndView;
    }
    @GetMapping("/register")
    public String register(){
        return "register";
    }
    @PostMapping("/register")
    public String register(@Valid RegisterDto registerDto, BindingResult bindingResult, RedirectAttributes attr){
        if (bindingResult.hasErrors()) {
            attr
                    .addFlashAttribute("registerDto", registerDto)
                    .addFlashAttribute("org.springframework.validation.BindingResult.registerDto", bindingResult);

            return "redirect:/register";
        }
        this.userService.registerUser(registerDto);
        return "redirect:/login";
    }
    @GetMapping("/home/search/{category}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ModelAndView categories(@PathVariable(required = false,name="category") String category, ModelAndView modelAndView,Principal principal){
        Skill skillByCategory = skillService.findUserBySkill(category);
        modelAndView.setViewName("home");
        List<User> users = skillByCategory.getCreatedBy().stream().filter(e -> !e.getUsername().equals(principal.getName())).toList();
        modelAndView.addObject("users",users);
        return modelAndView;
    }
    @ModelAttribute("skill")
    public Skill skill(){
        return new Skill();
    }
    @GetMapping("/home")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ModelAndView homePage(ModelAndView modelAndView, Principal principal){
        Role admin = userService.findUserByUsername(principal.getName()).get().getRole().stream().filter(e -> e.getName().contains("ADMIN")).findFirst().orElse(null);
        if(admin!=null){
            modelAndView.setViewName("adminHome");
        }else{
            List<Skill> skills = skillService.skills();
            modelAndView.setViewName("home");
            modelAndView.addObject("username",principal.getName());
            modelAndView.addObject("skills",skills);
            modelAndView.addObject("user",userService.findUserByUsername(principal.getName()).get());
        }
        return modelAndView;
    }
    @GetMapping("/facebookLogin")
    public String homeO2auth(){
        return "facebookLogin";
    }
    @GetMapping("/calendar")
    public String calendar(){
        return "calendar";
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/logout")
    public String logout(){
        return "/index";
    }
    @ModelAttribute(name="registerDto")
    public RegisterDto registerDto(){
        return new RegisterDto();
    }
    @ModelAttribute("searchDto")
    public SearchDto searchDto(){
        return new SearchDto();
    }
}
