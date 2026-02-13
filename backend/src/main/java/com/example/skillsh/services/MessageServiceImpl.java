package com.example.skillsh.services;

import com.example.skillsh.domain.entity.Message;
import com.example.skillsh.repository.MessageRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private MessageRepo messageRepo;
    private ChatService chatService;
    private ModelMapper mapper=new ModelMapper();
    private UserService userService;
@Autowired
    public MessageServiceImpl(MessageRepo messageRepo, ChatService chatService, UserService userService) {
        this.messageRepo = messageRepo;
    this.chatService = chatService;
    this.userService = userService;
}

    @Override
    public Message save(Message chatMessage) {
        var chatId = chatService
                .getChatRoomId(chatMessage.getSender(),chatMessage.getReceiver(), true)
                .orElseThrow();
        chatMessage.setChatId(chatId);
       messageRepo.save(chatMessage);
        return chatMessage;
    }

    @Override
    public List<Message> findChatMessages(String senderId, String recipientId) {
            var chatId = chatService.getChatRoomId(senderId, recipientId, false);
        return chatId.map(messageRepo::findByChatId).orElse(new ArrayList<>());
    }

    @Override
    public Message deleteMessage(Message delMessage) {
        Message message = this.messageRepo.findMessageByContent(delMessage.getContent()).orElse(null);
        try{
            this.messageRepo.delete(message);
        }catch(Exception e){
            System.out.println("Non existing message");
        }
        return message;
    }

}
