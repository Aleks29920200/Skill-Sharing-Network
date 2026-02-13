package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.ServiceOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ServiceOfferRepository extends JpaRepository<ServiceOffer, Long> {
    Optional<ServiceOffer> findById(Long id);




}
