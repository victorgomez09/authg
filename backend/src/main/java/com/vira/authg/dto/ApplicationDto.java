package com.vira.authg.dto;

import java.util.Date;
import java.util.List;

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
public class ApplicationDto {

    private Long id;

    private String name;

    private String description;

    private ApplicationType type;

    private String identifier;

    private SigningAlgorithm signingAlgorithm;

    private Long tokenExpiration;

    private String domain;

    private String clientId;

    private String clientSecret;

    private UserDto owner;

    private List<UserDto> users;

    private List<ApplicationScopesDto> scopes;

    private Date creationDate;

    private Date modificationDate;

}
