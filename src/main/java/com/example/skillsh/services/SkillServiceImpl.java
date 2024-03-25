package com.example.skillsh.services;

import com.example.skillsh.domain.dto.SkillDto;
import com.example.skillsh.domain.entity.Skill;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.repository.SkillRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {
    private SkillRepo skillRepo;
    private ModelMapper mapper=new ModelMapper();
    private UserServiceImpl userService;
    List<User>users = new ArrayList<>();
@Autowired
    public SkillServiceImpl(SkillRepo skillRepo, UserServiceImpl userService) {
        this.skillRepo = skillRepo;
    this.userService = userService;
}
    public List<Skill> skills(){
        return skillRepo.findAll();
    }
    public List<SkillDto> getSkills(){
        return skills().stream().map(e->mapper.map(e,SkillDto .class)).toList();
    }
    public Skill findUserBySkill(String nameOfSkill){
        Skill skill = getSkillByCategory(nameOfSkill);
        return skill;
    }

    @Override
    public Skill getSkillByCategory(String category) {
        return this.skillRepo.getSkillByCategory(category);
    }

    @Override
    public void seedCategories() {
        if(skillRepo.getSkillByCategory("it")==null){
            Skill skill=new Skill();
            skill.setCategory("it");
            skillRepo.save(skill);
        }
        if(skillRepo.getSkillByCategory("medicine")==null) {
            Skill skill1 = new Skill();
            skill1.setCategory("medicine");
            skillRepo.save(skill1);
        }
        if(skillRepo.getSkillByCategory("archaeology")==null){
            Skill skill2=new Skill();
            skill2.setCategory("archaeology");
            skillRepo.save(skill2);
        }
    }

    @Override
    public Skill getSkillByName(String name) {
       return this.skillRepo.getSkillByName(name);
    }
}
