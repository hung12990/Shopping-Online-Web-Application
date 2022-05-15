package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.dto.FormOrderDto;
import com.example.assignment.entity.Detail;
import com.example.assignment.entity.Order;
import com.example.assignment.service.OrderService;
import com.example.assignment.util.ConvertUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = ContextURL.API_URL)
public class OrderRestController {
    @Autowired
    OrderService orderService;

    @PostMapping(ContextURL.ORDER_SAVE)
    public ResponseEntity<?> createOrder(@RequestBody FormOrderDto dto){
        Order order = ConvertUtil.convertFromDtoToOrder(dto);
        List<Detail> details = dto.getDetails();
        return ResponseEntity.ok().body(orderService.save(order, details));
    }

    @GetMapping(ContextURL.ORDER_FIND_BY_USERNAME)
    public ResponseEntity<?> findOrdersByUsername(@PathVariable("username") String username){
        return new ResponseEntity<>(orderService.findByAccount_Username(username), HttpStatus.OK);
    }

    @GetMapping(ContextURL.ORDER_FIND_ALL)
    public ResponseEntity<?> findOrders(@RequestParam("page")Optional<Integer> page){
        Pageable pageable = PageRequest.of(page.orElse(1) - 1, 8);
        return new ResponseEntity<>(orderService.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping(ContextURL.ORDER_UPDATE)
    public ResponseEntity<?> updateOrder(@RequestParam("status")Optional<String> status,
                                         @PathVariable("id") Optional<Integer> id){
        return new ResponseEntity<>(orderService.update(id.get(), status.get()), HttpStatus.OK);
    }

    @GetMapping(ContextURL.ORDER_STATISTICAL)
    public ResponseEntity<?> getBestSeller(){
        Pageable pageable = PageRequest.of(0, 10);
        return new ResponseEntity<>(orderService.getBestSeller(pageable), HttpStatus.OK);
    }

}
