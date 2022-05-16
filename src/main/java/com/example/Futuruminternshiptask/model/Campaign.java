package com.example.Futuruminternshiptask.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    @ElementCollection
    private List<String> keywords;
    @Column(nullable = false)
    private Double bid_amount;
    @Column(nullable = false)
    private Double campaign_fund;
    private String town;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private Double radius;
}
