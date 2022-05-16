package com.example.Futuruminternshiptask.controller;

import com.example.Futuruminternshiptask.model.Campaign;
import com.example.Futuruminternshiptask.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaign")
@CrossOrigin(origins = "*")
public class CampaignController {

    private final CampaignService campaignService;

    @Autowired
    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Campaign>> getAllCampaigns(){
        List<Campaign> campaigns = campaignService.findAllCampaigns();
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable("id") Long id){
        Campaign campaign= campaignService.findCampaignById(id);
        return new ResponseEntity<>(campaign,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Campaign> addCampaign(@RequestBody Campaign campaign){
        Campaign newCampaign = campaignService.addCampaign(campaign);
        return new ResponseEntity<>(newCampaign,HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Campaign> updateCampaign(@RequestBody Campaign campaign){
        Campaign updateCampaign = campaignService.updateCampaign(campaign);
        return new ResponseEntity<>(updateCampaign,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCampaign(@PathVariable("id") Long id){
        campaignService.deleteCampaign(id);
    }
}
