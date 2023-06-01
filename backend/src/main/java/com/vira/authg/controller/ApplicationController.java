package com.vira.authg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vira.authg.dto.ApplicationAuthorizationDto;
import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationUpdateDto;
import com.vira.authg.security.CurrentUser;
import com.vira.authg.security.UserPrincipal;
import com.vira.authg.service.ApplicationService;

@RestController
@RequestMapping("/api/v1/application")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationDto>> findAllByUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok().body(service.findAllByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping("/authorize")
    public ResponseEntity<ApplicationAuthorizationDto> authorize(@RequestBody ApplicationAuthorizationDto data) {
        return ResponseEntity.ok().body(service.authorize(data));
    }

    @PostMapping()
    public ResponseEntity<ApplicationDto> create(@RequestBody ApplicationCreateDto data,
            @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(service.create(data, userPrincipal.getId()));
    }

    @PutMapping()
    public ResponseEntity<ApplicationDto> update(@RequestBody ApplicationUpdateDto data) {
        return ResponseEntity.ok().body(service.update(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.delete(id));
    }

}
