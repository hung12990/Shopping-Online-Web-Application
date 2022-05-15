package com.example.assignment.service.impl;

import com.example.assignment.entity.Role;
import com.example.assignment.exception.AppException;
import com.example.assignment.repo.RoleRepo;
import com.example.assignment.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepo roleRepo;

    @Override
    public Role findById(Integer id) {
        Optional<Role> optional = roleRepo.findById(id);
        if(optional.isPresent()){
            return optional.get();
        }
        throw new AppException(400, "Role", "Id", String.valueOf(id));
    }
}
