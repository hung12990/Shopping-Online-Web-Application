package com.example.assignment.controller;

import com.example.assignment.common.ContextURL;
import com.example.assignment.dto.LoginRequest;
import com.example.assignment.dto.LoginResponse;
import com.example.assignment.entity.Account;
import com.example.assignment.entity.Authority;
import com.example.assignment.model.CustomUserDetails;
import com.example.assignment.service.AccountService;
import com.example.assignment.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = ContextURL.API_URL)
@CrossOrigin("*")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        // Xác thực từ username và password.
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            // Nếu không xảy ra exception tức là thông tin hợp lệ
            // Set thông tin authentication vào Security Context
            if(loginRequest.getIsAdmin()){
                Account account = accountService.findByUsername(loginRequest.getUsername());
                List<Authority> authorities = account.getAuthorities();
                boolean flag = false;
                for(Authority authority: authorities){
                    if(authority.getRole().getId().equals(1)){
                        flag = true;
                    }
                }
                if(!flag){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are not an admin.");
                }
            }
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Trả về jwt cho người dùng.
            String jwt = jwtTokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());

            return ResponseEntity.ok().body(new LoginResponse(jwt));
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or Password is wrong.");
        }
    }
}
