package com.example.assignment.service;

import com.example.assignment.entity.Account;
import com.example.assignment.entity.Detail;
import com.example.assignment.entity.Order;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    Order save(Order order, List<Detail> details);

    List<Order> findByAccount_Username(String username);

    List<Order> findAll(Pageable pageable);

    Order update(Integer id, String status);

    List<Object[]> getBestSeller(Pageable pageable);
}
