package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ContextURL.API_URL)
@CrossOrigin("*")
public class CategoryRestController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(ContextURL.CATEGORY_FIND_ALL)
    public ResponseEntity<?> getCategories(){
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }
}
