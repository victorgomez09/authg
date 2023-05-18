package com.vira.authg.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vira.authg.dto.AuthErrorResponseDTO;

@RestControllerAdvice
public class AuthExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public AuthErrorResponseDTO handleUserNotFound(UserNotFoundException e) {
        return new AuthErrorResponseDTO(
                e.getMessage(),
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase()
        );
    }
    
    @ExceptionHandler(PasswordDoesNotMatchException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public AuthErrorResponseDTO handleCredentialsNotFound(PasswordDoesNotMatchException e) {
        return new AuthErrorResponseDTO(
                e.getMessage(),
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(), 
                HttpStatus.BAD_REQUEST.getReasonPhrase()
        );
    }

    @ExceptionHandler(TokenGenerationException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public AuthErrorResponseDTO handleTokenGeneration(TokenGenerationException e) {
        return new AuthErrorResponseDTO(
                e.getMessage(),
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase()
        );
    }
}
