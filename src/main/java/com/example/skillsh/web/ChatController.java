package com.example.skillsh.web;

import com.example.skillsh.domain.dto.ChatNotification;
import com.example.skillsh.domain.entity.Message;
import com.example.skillsh.services.MessageService;
import com.example.skillsh.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller

public class ChatController {
    private  SimpMessagingTemplate messagingTemplate;
    private  MessageService messageService;
    private UserService userService;
    private ModelMapper mapper=new ModelMapper();
@Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService, UserService userService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    this.userService = userService;
}

    @MessageMapping("/chat")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public void processMessage(@Payload Message chatMessage) {
        Message savedMsg = messageService.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver(), "/queue/messages",
                new ChatNotification(
                        savedMsg.getId(),
                       savedMsg.getSender(),
                       savedMsg.getReceiver(),
                        savedMsg.getContent())
        );
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<Object> findChatMessages(@PathVariable String senderId,
                                                          @PathVariable String recipientId) {
        return ResponseEntity
                .ok(messageService.findChatMessages(senderId, recipientId));
    }
    @GetMapping("/home/chatting")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ModelAndView chatting(ModelAndView model,Principal principal){
    model.setViewName("chat");
    model.addObject("username",principal.getName());
    model.addObject("firstname",userService.findUserByUsername(principal.getName()).orElse(null).getFirstName());
    return model;
    }
    @GetMapping("/videochat/{userId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ModelAndView videoCall(@PathVariable("userId") Long userId,Principal principal, ModelAndView modelAndView){
    modelAndView.setViewName("video-call");
    modelAndView.addObject("username",principal.getName());
    modelAndView.addObject("userId",userService.findUserByUsername(principal.getName()).get().getId());
    return modelAndView;
    }

}
