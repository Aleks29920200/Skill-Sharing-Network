package com.example.skillsh.services.search;

import com.example.skillsh.domain.dto.search.SearchDto;
import com.example.skillsh.services.skill.SkillServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchServiceImpl implements SearchService {
    private SkillServiceImpl skillService;
@Autowired
    public SearchServiceImpl(SkillServiceImpl skillService) {
        this.skillService = skillService;
    }

    @Override
    public void findSearchedInformationByCategory(SearchDto searchDto) {
    skillService.getSkillByName(searchDto.getInfo());
    }
}
