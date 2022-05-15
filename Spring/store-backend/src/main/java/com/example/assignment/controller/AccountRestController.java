package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.dto.FormAccountDto;
import com.example.assignment.entity.Account;
import com.example.assignment.exception.AppException;
import com.example.assignment.service.AccountService;
import com.example.assignment.service.AuthorityService;
import com.example.assignment.util.ConvertUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(path = ContextURL.API_URL)
public class AccountRestController {
    @Autowired
    AccountService accountService;

    @Autowired
    AuthorityService authorityService;

    @PostMapping(ContextURL.ACCOUNT_SAVE)
    public ResponseEntity<Account> createAccount(@Validated @RequestBody FormAccountDto dto){
        Account account = ConvertUtil.convertFromDtoToAccount(dto);
        return new ResponseEntity<>(accountService.createAccount(account), HttpStatus.CREATED);
    }

    @GetMapping(ContextURL.ACCOUNT_FIND_BY_USERNAME)
    public ResponseEntity<Account> findByUsername(@PathVariable("username")Optional<String> username) {
        return new ResponseEntity<>(accountService.findByUsername(username.orElse(null)), HttpStatus.OK);
    }

    @GetMapping(ContextURL.ACCOUNT_ROLE)
    public ResponseEntity<?> findAuthorityByUsername(@PathVariable("username")Optional<String> username) {
        return new ResponseEntity<>(authorityService.findAuthorityByAccount_Username(username.orElse(null)), HttpStatus.OK);
    }

    @GetMapping(ContextURL.ACCOUNT_FIND_ALL)
    public ResponseEntity<?> findAccounts(@RequestParam("page") Optional<Integer> page){
        Pageable pageable = PageRequest.of(page.orElse(1) - 1, 8);
        return new ResponseEntity<>(accountService.findAll(pageable), HttpStatus.OK);
    }


}
