package com.authg.jwt.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
public class JwtUtil {

    @Getter
    @Value("${authg.jwt.secret}")
    private String jwtSecret;

    @Getter
    @Value("${authg.jwt.audience}")
    private String jwtAudience;

    @Getter
    @Value("${authg.jwt.issuer}")
    private String jwtIssuer;
}
