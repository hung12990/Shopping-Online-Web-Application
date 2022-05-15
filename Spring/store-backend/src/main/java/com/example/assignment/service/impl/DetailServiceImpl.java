package com.example.assignment.service.impl;

import com.example.assignment.entity.Detail;
import com.example.assignment.repo.DetailRepo;
import com.example.assignment.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DetailServiceImpl implements DetailService {
    @Autowired
    DetailRepo detailRepo;

    @Override
    public List<Detail> saveDetails(List<Detail> details) {
        return detailRepo.saveAll(details);
    }
}
