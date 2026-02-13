package com.example.skillsh.web;

import com.example.skillsh.domain.entity.User;
import com.example.skillsh.domain.view.UserView;
import com.example.skillsh.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;

@Controller
public class UserController {
    private UserService userService;
    private ModelMapper mapper=new ModelMapper();
@Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/admin/all-users")
    public ModelAndView users(ModelAndView modelAndView, Principal principal){
        List<UserView> users = userService.users().stream().filter(e -> !e.getUsername().equals(principal.getName())).map(e->mapper.map(e,UserView.class)).toList();
        modelAndView.setViewName("allUsers");
    modelAndView.addObject("users",users);
    return modelAndView;
    }
    @MessageMapping("/user.addUser")
    @SendTo("user-public")
    public User addUser(@Payload User user) {
        userService.saveUser(user);
        return user;
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("user-public")
    public User disconnectUser(@Payload User user) {
        userService.disconnect(user);
        return user;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findConnectedUsers() {
        return ResponseEntity.ok(userService.findConnectedUsers());
    }
    @ModelAttribute("user")
    public UserView user(){
        return new UserView();
    }
}
