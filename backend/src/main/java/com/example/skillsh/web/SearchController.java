package com.example.skillsh.web;

import com.example.skillsh.domain.dto.RegisterDto;
import com.example.skillsh.domain.dto.SearchDto;
import com.example.skillsh.domain.entity.Skill;
import com.example.skillsh.domain.entity.User;
import com.example.skillsh.domain.view.UserView;
import com.example.skillsh.services.SkillServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;

@Controller
public class SearchController {
    private SkillServiceImpl skillService;
@Autowired
    public SearchController(SkillServiceImpl skillService) {
        this.skillService = skillService;
}
@GetMapping("/search")
public String search(){
    return "search";
    }
    @GetMapping("/index/search/{category}")
    public ModelAndView categories(@PathVariable(required = false,name="category") String category, ModelAndView modelAndView){
        Skill skillByCategory = skillService.findUserBySkill(category);
        modelAndView.setViewName("index");
        modelAndView.addObject("users",skillByCategory.getCreatedBy());
      return modelAndView;
    }
    @PostMapping("/search")
    public String searchPost(@Valid SearchDto searchDto, RedirectAttributes attr, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        attr
                .addFlashAttribute("searchDto", searchDto)
                .addFlashAttribute("org.springframework.validation.BindingResult.searchDto", bindingResult);
        return "/search";
    }
    Skill skillByName = this.skillService.getSkillByName(searchDto.getInfo());
    return "redirect:"+"/search/"+skillByName.getCategory();
    }
    @ModelAttribute("user")
    public UserView user(){
    return new UserView();
    }
    @ModelAttribute("skill")
    public Skill skill(){
        return new Skill();
    }
    @ModelAttribute("searchDto")
    public SearchDto searchDto(){
        return new SearchDto();
    }
}
