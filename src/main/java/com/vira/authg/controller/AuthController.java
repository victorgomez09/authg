package com.vira.authg.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vira.authg.dto.TokenRefreshDTO;
import com.vira.authg.dto.TokenResponseDTO;
import com.vira.authg.dto.UserLoginDTO;
import com.vira.authg.dto.UserRegisterDTO;
import com.vira.authg.service.AuthService;

@AllArgsConstructor
@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final UserLoginDTO userLoginDTO) {
        TokenResponseDTO tokenResponse = this.authService.login(userLoginDTO);
        return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody final UserRegisterDTO userRegisterDTO) {
        TokenResponseDTO tokenResponse = this.authService.register(userRegisterDTO);
        return new ResponseEntity<>(tokenResponse, HttpStatus.CREATED);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody final TokenRefreshDTO tokenRefreshDTO) {
        TokenResponseDTO tokenResponse = this.authService.refresh(tokenRefreshDTO);
        return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
    }
}
