package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.Message;
import com.example.skillsh.domain.entity.OfferCategory;
import com.example.skillsh.domain.entity.OfferFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferCategoryRepository extends JpaRepository<OfferCategory, Long> {
}
