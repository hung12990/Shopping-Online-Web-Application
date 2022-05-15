package com.example.assignment.service.impl;

import com.example.assignment.common.Constant;
import com.example.assignment.entity.Account;
import com.example.assignment.exception.AppException;
import com.example.assignment.model.CustomUserDetails;
import com.example.assignment.repo.AccountRepo;
import com.example.assignment.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepo accountRepo;

    @Override
    public List<Account> findAll(Pageable pageable) {
        return accountRepo.findAll(pageable).getContent();
    }

    @Override
    public Account createAccount(Account account) {
        if(accountRepo.existsByUsername(account.getUsername())){
            throw new AppException(400, "Account", "Username", account.getUsername());
        }

        if(accountRepo.existsByEmail(account.getEmail())){
            throw new AppException(400, "Account", "Email", account.getEmail());
        }

        return accountRepo.save(account);
    }

    @Override
    public Account updateAccount(Account account, Long id) {
        Optional<Account> optional = accountRepo.findById(id);
        if(optional.isPresent()){
            Account old = optional.get();
            if(!old.getUsername().equals(account.getUsername())){
                throw new AppException(400, "Account", "Username", account.getUsername());
            }
            if(!old.getEmail().equals(account.getEmail())){
                if(accountRepo.existsByEmail(account.getEmail())){
                    throw new AppException(400, "Account", "Email", account.getEmail());
                }
            }
            account.setId(id);
            return accountRepo.save(account);
        }
        throw new AppException(400, "Account", "Id", String.valueOf(id));
    }

    @Override
    public Account findByUsername(String username) throws AppException {
        Account account = accountRepo.findByUsername(username);
        if(account == null){
            throw new AppException(400, "Account", "Username", username);
        }
        return account;
    }

    @Override
    public void delete(Long id) {
        Optional<Account> optional = accountRepo.findById(id);
        if(optional.isPresent()){
            Account account = optional.get();
            account.setAvailable(Constant.IN_ACTIVE);
            accountRepo.save(account);
        }
        throw new AppException(400, "Account", "Id", String.valueOf(id));
    }

    // JWTAuthenticationFilter sẽ sử dụng hàm này
    @Transactional
    @Override
    public UserDetails loadUserById(Long id) {
        Account account = accountRepo.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return new CustomUserDetails(account);
    }

    @Override
    public Account findById(Long id) {
        Optional<Account> optional = accountRepo.findById(id);
        if(optional.isPresent()){
            return optional.get();
        }
        throw new AppException(400, "Account", "Id", String.valueOf(id));
    }


    @Override
    public UserDetails loadUserByUsername(String username) {
        Account account = accountRepo.findByUsername(username);
        if(account == null){
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(account);
    }
}
