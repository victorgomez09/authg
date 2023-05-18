package com.vira.authg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthErrorResponseDTO {
    private String message;
    private LocalDateTime time;
    private int statusCode;
    private String statusError;
}
