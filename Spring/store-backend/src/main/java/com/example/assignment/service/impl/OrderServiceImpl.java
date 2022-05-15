package com.example.assignment.service.impl;

import com.example.assignment.entity.Account;
import com.example.assignment.entity.Detail;
import com.example.assignment.entity.Order;
import com.example.assignment.entity.Product;
import com.example.assignment.exception.AppException;
import com.example.assignment.repo.OrderRepo;
import com.example.assignment.service.DetailService;
import com.example.assignment.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepo orderRepo;

    @Autowired
    DetailService detailService;

    @Override
    @Transactional
    public Order save(Order order, List<Detail> details) {
        Order result = orderRepo.save(order);
        for(Detail detail: details){
            detail.setOrder(result);
        }
        detailService.saveDetails(details);
        return result;
    }

    @Override
    public List<Order> findByAccount_Username(String username) {
        return orderRepo.findByAccount_Username(username);
    }

    @Override
    public List<Order> findAll(Pageable pageable) {
        return orderRepo.findAll(pageable).getContent();
    }

    @Override
    public Order update(Integer id, String status) {
        Optional<Order> optional = orderRepo.findById(id);
        if(optional.isPresent()){
            Order order = optional.get();
            order.setStatus(status);
            return orderRepo.save(order);
        }
        throw new AppException(400, "Order", "Id", String.valueOf(id));
    }

    @Override
    public List<Object[]> getBestSeller(Pageable pageable) {
        return orderRepo.getBestSeller(pageable);
    }
}
