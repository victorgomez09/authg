package com.vira.authg.dto;

import com.vira.authg.model.ApplicationType;
import com.vira.authg.model.SigningAlgorithm;
import com.vira.authg.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ApplicationCreateDto {

    private Long id;

    private String name;

    private String description;

    private ApplicationType type;

    private String identifier;

    private SigningAlgorithm signingAlgorithm;

    private Long tokenExpiration;

    private User owner;

}
