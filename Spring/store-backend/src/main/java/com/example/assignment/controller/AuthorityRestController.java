package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.entity.Authority;
import com.example.assignment.service.AccountService;
import com.example.assignment.service.AuthorityService;
import com.example.assignment.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping(path = ContextURL.API_URL)
public class AuthorityRestController {
    @Autowired
    AuthorityService authorityService;

    @Autowired
    AccountService accountService;

    @Autowired
    RoleService roleService;

//    @GetMapping("/authority/{accountId}/{roleId}")
//    public ResponseEntity<?> findAuthorityByAccount_IdAndRole_Id(@PathVariable("accountId") Long accountId,
//                                                                 @PathVariable("roleId") Integer roleId){
//        return new ResponseEntity<>(authorityService.findAuthorityByAccount_IdAndRole_Id(accountId, roleId),
//                HttpStatus.OK);
//    }

    @GetMapping(ContextURL.AUTHORITY_APPOINT)
    public ResponseEntity<?> createAuthorityByAccount_IdAndRole_Id(@PathVariable("accountId") Long accountId,
                                                                   @PathVariable("roleId") Integer roleId){
        Authority existAuthority = authorityService.findAuthorityByAccount_IdAndRole_Id(accountId, roleId);
        if(existAuthority == null){
            Authority authority = new Authority();
            authority.setAccount(accountService.findById(accountId));
            authority.setRole(roleService.findById(roleId));
            return new ResponseEntity<>(authorityService.createAuthority(authority),HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Already authorization.", HttpStatus.OK);
    }

    @GetMapping(ContextURL.AUTHORITY_RECALL)
    public ResponseEntity<?> deleteAuthorityByAccount_IdAndRole_Id(@PathVariable("accountId") Long accountId,
                                                                 @PathVariable("roleId") Integer roleId){
        Authority existAuthority = authorityService.findAuthorityByAccount_IdAndRole_Id(accountId, roleId);
        if(existAuthority != null){
            authorityService.deleteAuthority(existAuthority);
            return new ResponseEntity<>("Successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Already not authorization.", HttpStatus.OK);
    }
}
