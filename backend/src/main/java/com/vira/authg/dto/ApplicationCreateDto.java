package com.vira.authg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ApplicationCreateDto {

    private String name;

    private String description;

    private String type;

    private String identifier;

    private String signingAlgorithm;

    private Long tokenExpiration;

}
