package com.example.skillsh.repository;

import com.example.skillsh.domain.entity.Endorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EndorsementRepo extends JpaRepository<Endorsement, Long> {

}
