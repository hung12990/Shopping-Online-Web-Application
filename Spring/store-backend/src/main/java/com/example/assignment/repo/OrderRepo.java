package com.example.assignment.repo;

import com.example.assignment.entity.Account;
import com.example.assignment.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByAccount_Username(String username);

    @Query("SELECT p.id, p.name, p.price, SUM(d.quantity) as quantity, MAX(o.create) as Lastest FROM Order o INNER JOIN o.details d INNER JOIN d.product p WHERE o.status <> 'DA HUY' GROUP BY p.id ORDER BY quantity desc ")
    List<Object[]> getBestSeller(Pageable pageable);
}