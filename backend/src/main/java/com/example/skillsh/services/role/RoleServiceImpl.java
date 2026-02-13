package com.example.skillsh.services.role;

import com.example.skillsh.domain.entity.Role;
import com.example.skillsh.repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepo roleRepo;
@Autowired
    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
}
    @Override
    public void seedRoles() {
    if(roleRepo.getRoleByName("ADMIN").isEmpty()){
        roleRepo.save(new Role("ADMIN"));
    }if(roleRepo.getRoleByName("EXPERT").isEmpty()){
        roleRepo.save(new Role("EXPERT"));
    }if(roleRepo.getRoleByName("CLIENT").isEmpty()){
        roleRepo.save(new Role("CLIENT"));
        }
    }

    @Override
    public List<Role> roles() {
        return this.roleRepo.findAll();
    }


}
