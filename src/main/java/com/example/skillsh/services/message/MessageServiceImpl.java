package com.example.skillsh.services.message;

import com.example.skillsh.domain.entity.Message;
import com.example.skillsh.repository.MessageRepo;
import com.example.skillsh.services.chat.ChatService;
import com.example.skillsh.services.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Message saveMessage(Message message) {
        return messageRepo.save(message);
    }

    @Override
    public Optional<Message> getMessageById(Long id) {
        return messageRepo.findById(id);
    }
@Override
public List<Message> getChatHistory(String user1, String user2) {
        return messageRepo.findBySenderAndReceiverOrReceiverAndSender(user1, user2, user1, user2);
    }
@Override
public Message editMessage(Long id, String newContent) {
        Optional<Message> optional = messageRepo.findById(id);
        if (optional.isPresent()) {
            Message message = optional.get();
            message.setContent(newContent);
            message.setEdited(true);
            return messageRepo.save(message);
        }
        return null;
    }
@Override
public Message deleteMessageById(Long id) {
        Optional<Message> optional = messageRepo.findById(id);
        if (optional.isPresent()) {
            Message message = optional.get();
            message.setIndicatorForDeletion(true);
            messageRepo.deleteById(message.getId());
            return null;
        }
        return null;
    }

    @Override
    public List<Message> findBySenderAndReceiverOrReceiverAndSender(String sender1, String receiver1, String receiver2, String sender2) {
        return this.messageRepo.findBySenderAndReceiverOrReceiverAndSender(sender1,receiver1,receiver2,sender2);
    }

}
