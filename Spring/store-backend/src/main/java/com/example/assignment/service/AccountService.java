package com.example.assignment.service;

import com.example.assignment.entity.Account;
import com.example.assignment.exception.AppException;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface AccountService extends UserDetailsService {
    List<Account> findAll(Pageable pageable);

    Account createAccount(Account account);

    Account updateAccount(Account account, Long id);

    Account findByUsername(String username) throws AppException;

    void delete(Long id);

    UserDetails loadUserById(Long id);

    Account findById(Long id);
}
