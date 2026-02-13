package com.example.skillsh.services.role;

import com.example.skillsh.domain.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {

    void seedRoles();

    List<Role> roles();


}
