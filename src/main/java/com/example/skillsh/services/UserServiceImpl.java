package com.example.skillsh.services;

import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.dto.RoleDto;
import com.example.skillsh.domain.entity.Role;
import com.example.skillsh.domain.entity.Skill;
import com.example.skillsh.domain.entity.Status;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.repository.RoleRepo;
import com.example.skillsh.repository.SkillRepo;
import com.example.skillsh.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;
    private BCryptPasswordEncoder passwordEncoder;
    private ModelMapper mapper=new ModelMapper();
    private RoleRepo roleRepo;
    private SkillRepo skillRepo;
    List<User> userList=new ArrayList<>();
    @Autowired
    public UserServiceImpl(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder, RoleRepo roleRepo, SkillRepo skillRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder=passwordEncoder;
        this.roleRepo = roleRepo;
        this.skillRepo = skillRepo;
    }

    @Override
    public void registerUser(RegisterDto registerDto) {
        User user=new User();
        user.setEmail(registerDto.getEmail());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        if(userRepo.count()==0){
            Set<Role> roles=new HashSet<>();
            Role role_admin = mapper.map(new RoleDto("ROLE_ADMIN"), Role.class);
            roleRepo.save(role_admin);
            roleRepo.flush();
            roles.add(role_admin);
            user.setRole(roles);
            userRepo.save(user);
        }else{
            Set<Role> roles=new HashSet<>();
            Role role_user = mapper.map(new RoleDto("ROLE_USER"), Role.class);
            roleRepo.saveAndFlush(role_user);
            roles.add(role_user);
            user.setRole(roles);
            userRepo.save(user);
            Skill skillByCategory = this.skillRepo.getSkillByCategory(registerDto.getCategoryOfSkill());
            userList.add(user);
            skillByCategory.setCreatedBy(userList);
            skillRepo.save(skillByCategory);
        }
        userRepo.save(user);
    }
    @Override
    public void saveUser(User user) {
        User user1 = this.userRepo.findUserByUsername(user.getUsername()).orElse(null);
        user1.setActivity(Status.ONLINE);
        userRepo.save(user1);
    }
@Override
    public void disconnect(User user) {
        var storedUser = userRepo.findUserByUsername(user.getUsername()).orElse(null);
        if (storedUser != null) {
            storedUser.setActivity(Status.OFFLINE);
            userRepo.save(storedUser);
        }
    }
    @Override
    public List<User> findConnectedUsers() {
        return userRepo.findAllByActivity(Status.ONLINE);
    }
    @Override
    public Optional<User> findUserByUsername(String username) {
        return this.userRepo.findUserByUsername(username);
    }
    @Override
    public List<User> users(){
        return this.userRepo.findAll();
    }
}
