package com.vira.authg.util;

import java.util.Random;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ApplicationUtils {

    @Autowired
    private ServletContext context;

    String upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    String lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    String numbers = "0123456789";

    public String generateApplicationDomain() {
        return context.getContextPath();
    }

    public String generateApplicationClientId() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;

        for (int i = 0; i < 10; i++) {
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

        for (int i = 0; i < 20; i++) {
            int index = random.nextInt(alphaNumeric.length());
            char randomChar = alphaNumeric.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

}
