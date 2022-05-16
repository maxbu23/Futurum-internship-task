package com.example.Futuruminternshiptask.repository;

import com.example.Futuruminternshiptask.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    Optional<Campaign> findCampaignById(Long id);
}
