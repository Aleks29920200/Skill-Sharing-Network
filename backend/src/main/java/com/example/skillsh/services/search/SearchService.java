package com.example.skillsh.services.search;

import com.example.skillsh.domain.dto.search.SearchDto;
import org.springframework.stereotype.Service;

@Service
public interface SearchService {
   void findSearchedInformationByCategory(SearchDto searchDto);
}
