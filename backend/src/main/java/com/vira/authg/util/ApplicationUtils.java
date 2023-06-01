package com.vira.authg.util;

import java.util.Random;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class ApplicationUtils {

    String upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    String lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    String numbers = "0123456789";

    public String generateApplicationDomain() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }

    public String generateApplicationClientId() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;

        for (int i = 0; i < 20; i++) {
            int index = random.nextInt(alphaNumeric.length());
            char randomChar = alphaNumeric.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    public String generateApplicationClientSecret() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;

        for (int i = 0; i < 35; i++) {
            int index = random.nextInt(alphaNumeric.length());
            char randomChar = alphaNumeric.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

}
