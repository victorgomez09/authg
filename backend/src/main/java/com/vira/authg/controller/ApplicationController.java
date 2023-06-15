package com.vira.authg.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vira.authg.dto.ApplicationAuthorizationDto;
import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationScopesDto;
import com.vira.authg.dto.ApplicationUpdateDto;
import com.vira.authg.security.CurrentUser;
import com.vira.authg.security.UserPrincipal;
import com.vira.authg.service.ApplicationService;

@RestController
@RequestMapping("/api/v1/application")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @GetMapping("/user")
    public ResponseEntity<List<ApplicationDto>> findAllByUser(@RequestParam String email) {
        return ResponseEntity.ok().body(service.findAllByUser(email));
    }

    @GetMapping("/type")
    public ResponseEntity<List<ApplicationDto>> findAllByType(@RequestParam("type") String type) {
        return ResponseEntity.ok().body(service.findAllByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping("/authorize")
    public ResponseEntity<Boolean> authorize(HttpServletRequest request) {
        return ResponseEntity.ok().body(service.authorize(request));
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

    @PutMapping("/{id}")
    public ResponseEntity<List<ApplicationScopesDto>> addScopes(@PathVariable Long id,
            @RequestBody ApplicationScopesDto data) {
        return ResponseEntity.ok().body(service.addApplicationScopes(id, data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.delete(id));
    }

}
