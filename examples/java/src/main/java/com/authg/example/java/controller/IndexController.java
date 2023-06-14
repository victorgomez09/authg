package com.authg.example.java.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    
    @GetMapping("/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok().body(String.valueOf("{data: 'Hello world'}"));
    }

    @GetMapping("/public")
    public ResponseEntity<String> publicPath() {
        return ResponseEntity.ok().body(String.valueOf("{data: 'Public route'}"));
    }

    @GetMapping("/public2")
    public ResponseEntity<String> publicPath2() {
        return ResponseEntity.ok().body(String.valueOf("{data: 'Public route 2'}"));
    }

    @GetMapping("/protected")
    public ResponseEntity<String> protectedPath() {
        return ResponseEntity.ok().body(String.valueOf("{data: 'Protected route'}"));
    }
}
