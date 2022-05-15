package com.example.assignment.service;

import com.example.assignment.entity.Authority;

import java.util.List;

public interface AuthorityService {
    List<Authority> findAuthorityByAccount_Username(String username);

    Authority createAuthority(Authority authority);

    void deleteAuthority(Authority authority);

    Authority findAuthorityByAccount_IdAndRole_Id(Long accountId, Integer roleId);
}
