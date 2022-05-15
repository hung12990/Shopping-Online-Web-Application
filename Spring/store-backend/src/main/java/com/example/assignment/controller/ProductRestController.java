package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.dto.FormProductDto;
import com.example.assignment.entity.Product;
import com.example.assignment.exception.AppException;
import com.example.assignment.service.ProductService;
import com.example.assignment.util.ConvertUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = ContextURL.API_URL)
public class ProductRestController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    ProductService productService;

    @GetMapping(path = ContextURL.PRODUCT_FIND_ALL)
    public ResponseEntity<List<Product>> findAll(@RequestParam("page")Optional<Integer> page,
                                                 @RequestParam("size") Optional<Integer> size){
        Pageable pageable = PageRequest.of(page.orElse(1) - 1, size.orElse(8));
        return new ResponseEntity<>(productService.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping(path = ContextURL.PRODUCT_FIND_BY_CATEGORY)
    public ResponseEntity<List<Product>> findByCategory(@RequestParam("page")Optional<Integer> page,
                                                        @RequestParam("size") Optional<Integer> size,
                                                        @PathVariable("id") Integer id){
        Pageable pageable = PageRequest.of(page.orElse(1) - 1, size.orElse(8));
        return new ResponseEntity<>(productService.findAllByCategory_Id(id, pageable), HttpStatus.OK);
    }
    
    @PostMapping(path = ContextURL.PRODUCT_SAVE)
    public ResponseEntity<Product> save(@Valid @RequestBody FormProductDto dto){
        Product product = ConvertUtil.convertFromDtoToProduct(dto);
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }

    @PostMapping(path = ContextURL.PRODUCT_UPDATE)
    public ResponseEntity<Product> update(@Valid @RequestBody FormProductDto dto,
                                    @PathVariable("id") Optional<Long> id) throws AppException {
        Product product = ConvertUtil.convertFromDtoToProduct(dto);
        return new ResponseEntity<>(productService.update(product, id.get()), HttpStatus.OK);
    }

    @GetMapping(path = ContextURL.PRODUCT_DELETE)
    public ResponseEntity<String> delete(@PathVariable("id") Optional<Long> id) throws AppException {
        productService.delete(id.orElse(null));
        return new ResponseEntity<>("Succesfully!", HttpStatus.OK);
    }

    @GetMapping(path = ContextURL.PRODUCT_FIND_BY_ID)
    public ResponseEntity<?> findById(@PathVariable("id") Optional<Long> id) throws AppException {
        return ResponseEntity.ok().body(productService.findById(id.orElse(null)));
    }

    @GetMapping(path = ContextURL.PRODUCT_PAGE_COUNT)
    public ResponseEntity<?> countPage(){
        return ResponseEntity.ok().body(productService.countPage(PageRequest.of(0, 8)));
    }
}
