package com.example.assignment.util;

import com.example.assignment.common.Constant;
import com.example.assignment.dto.FormAccountDto;
import com.example.assignment.dto.FormOrderDto;
import com.example.assignment.dto.FormProductDto;
import com.example.assignment.entity.Account;
import com.example.assignment.entity.Order;
import com.example.assignment.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

public class ConvertUtil {

    public static Order convertFromDtoToOrder(FormOrderDto dto){
        Order order = new Order();
        order.setAddress(dto.getAddress());
        order.setAccount(dto.getAccount());
        order.setPhone(dto.getPhone());
        order.setCreate(LocalDate.now());
        order.setStatus(Constant.STATUS_CHO_DUYET);
        order.setAmount(dto.getAmount());
        return order;
    }

    public static Product convertFromDtoToProduct(FormProductDto dto){
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setImage(dto.getImage());
        product.setAvailable(Constant.ACTIVE);
        product.setCategory(dto.getCategory());
        product.setCreate(LocalDate.now());
        return product;
    }

    public static Account convertFromDtoToAccount(FormAccountDto dto){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Account account = new Account();
        account.setUsername(dto.getUsername());
        account.setName(dto.getName());
        account.setEmail(dto.getEmail());
        account.setPassword(passwordEncoder.encode(dto.getPassword()));
        account.setAvailable(Constant.ACTIVE);
        return account;
    }
}
