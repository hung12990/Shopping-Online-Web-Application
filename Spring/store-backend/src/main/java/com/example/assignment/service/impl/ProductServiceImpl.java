package com.example.assignment.service.impl;

import com.example.assignment.common.Constant;
import com.example.assignment.entity.Product;
import com.example.assignment.exception.AppException;
import com.example.assignment.repo.ProductRepo;
import com.example.assignment.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepo productRepo;

    @Override
    public List<Product> findAll(Pageable pageable) {
        return productRepo.findAll(pageable).getContent();
    }

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product update(Product product, Long id){
        Optional<Product> optional = productRepo.findById(id);
        if(optional.isPresent()){
            Product pro = optional.get();
            pro.setName(product.getName());
            pro.setPrice(product.getPrice());
            pro.setCategory(product.getCategory());
            pro.setImage(product.getImage());
            productRepo.save(pro);
            return pro;
        }else{
            throw new AppException(400, "Product", "Id", String.valueOf(id));
        }
    }

    @Override
    public void delete(Long id){
        if(!productRepo.existsById(id)){
            throw new AppException(400, "Product", "Id", String.valueOf(id));
        }
        Product product = productRepo.findById(id).orElse(null);
        product.setAvailable(Constant.IN_ACTIVE);
        productRepo.save(product);
    }

    @Override
    public Product findById(Long id){
       Optional<Product> optionalProduct = productRepo.findById(id);
       if(optionalProduct.isPresent()){
           return optionalProduct.get();
       }else{
           throw new AppException(400, "Product", "Id", String.valueOf(id));
       }
    }

    @Override
    public Integer countPage(Pageable pageable) {
        Page<Product> page = productRepo.findAll(pageable);
        return page.getTotalPages();
    }

    @Override
    public List<Product> findAllByCategory_Id(Integer id, Pageable pageable) {
        return productRepo.findAllByCategory_Id(id, pageable);
    }
}
