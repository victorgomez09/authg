package com.vira.authg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationScopesDto {

    private String scope;

    private String description;

    private ApplicationDto application;
}
