package com.example.assignment.service;

import com.example.assignment.entity.Product;
import com.example.assignment.exception.AppException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> findAll(Pageable pageable);

    Product save(Product product);

    Product update(Product product, Long id);

    void delete(Long id);

    Product findById(Long id);

    Integer countPage(Pageable pageable);

    List<Product> findAllByCategory_Id(Integer id, Pageable pageable);
}
