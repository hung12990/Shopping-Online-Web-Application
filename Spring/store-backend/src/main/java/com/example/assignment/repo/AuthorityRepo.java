package com.example.assignment.repo;

import com.example.assignment.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorityRepo extends JpaRepository<Authority, Integer> {
    List<Authority> findAuthorityByAccount_Username(String username);

    Authority findAuthorityByAccount_IdAndRole_Id(Long accountId, Integer roleId);
}
