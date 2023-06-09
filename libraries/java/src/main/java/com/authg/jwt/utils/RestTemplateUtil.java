package com.authg.jwt.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
public class RestTemplateUtil {

    @Getter
    @Value("${authg.jwt.audience}")
    private String authgUrl;
}
