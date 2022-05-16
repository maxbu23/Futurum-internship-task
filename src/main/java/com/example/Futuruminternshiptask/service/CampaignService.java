package com.example.Futuruminternshiptask.service;

import com.example.Futuruminternshiptask.model.Campaign;
import com.example.Futuruminternshiptask.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    @Autowired
    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public Campaign addCampaign(Campaign campaign){
        return this.campaignRepository.save(campaign);
    }

    public List<Campaign> findAllCampaigns(){
        return this.campaignRepository.findAll();
    }

    public Campaign updateCampaign(Campaign campaign){
        return this.campaignRepository.save(campaign);
    }

    public Campaign findCampaignById(Long id){
        return this.campaignRepository.findCampaignById(id).orElseThrow(NoSuchElementException::new);
    }

    public void deleteCampaign(Long id){
        this.campaignRepository.deleteById(id);
    }
}
