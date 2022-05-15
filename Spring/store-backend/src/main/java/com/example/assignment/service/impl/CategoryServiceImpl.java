package com.example.assignment.service.impl;

import com.example.assignment.entity.Category;
import com.example.assignment.repo.CategoryRepo;
import com.example.assignment.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepo categoryRepo;

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }
}
