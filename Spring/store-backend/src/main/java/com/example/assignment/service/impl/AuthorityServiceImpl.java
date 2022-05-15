package com.example.assignment.service.impl;

import com.example.assignment.entity.Authority;
import com.example.assignment.exception.AppException;
import com.example.assignment.repo.AuthorityRepo;
import com.example.assignment.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {
    @Autowired
    AuthorityRepo authorityRepo;

    @Override
    public List<Authority> findAuthorityByAccount_Username(String username) {
        return authorityRepo.findAuthorityByAccount_Username(username);
    }

    @Override
    public Authority createAuthority(Authority authority) {
        return authorityRepo.save(authority);
    }

    @Override
    public void deleteAuthority(Authority authority) {
        authorityRepo.delete(authority);
    }

    @Override
    public Authority findAuthorityByAccount_IdAndRole_Id(Long accountId, Integer roleId) {
        Authority authority = authorityRepo.findAuthorityByAccount_IdAndRole_Id(accountId, roleId);
        return authority;
    }
}
