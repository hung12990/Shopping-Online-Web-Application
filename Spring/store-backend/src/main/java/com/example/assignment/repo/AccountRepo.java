package com.example.assignment.repo;

import com.example.assignment.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long> {
    Account findByUsername(String username);

    Account findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
