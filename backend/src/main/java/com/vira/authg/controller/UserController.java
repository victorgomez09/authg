package com.vira.authg.controller;

import com.vira.authg.dto.ApplicationScopesDto;
import com.vira.authg.dto.UserDto;
import com.vira.authg.exception.ResourceNotFoundException;
import com.vira.authg.model.User;
import com.vira.authg.repository.UserRepository;
import com.vira.authg.security.CurrentUser;
import com.vira.authg.security.UserPrincipal;
import com.vira.authg.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/api/v1/users/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UserDto>> findAllUsers() {
        return ResponseEntity.ok().body(userService.findAll());
    }

    @GetMapping("/api/v1/users/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.findUserById(id));
    }

    @PutMapping("/api/v1/users/{id}/scopes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> addUserScopes(@PathVariable Long id, @RequestBody List<ApplicationScopesDto> data) {
        return ResponseEntity.ok().body(userService.addUserScopes(id, data));
    }

}
