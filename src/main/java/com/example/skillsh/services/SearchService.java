package com.example.skillsh.services;

import com.example.skillsh.domain.dto.SearchDto;
import org.springframework.stereotype.Service;

@Service
public interface SearchService {
   void findSearchedInformationByCategory(SearchDto searchDto);
}
