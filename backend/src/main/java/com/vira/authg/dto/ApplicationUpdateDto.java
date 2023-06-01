package com.vira.authg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ApplicationUpdateDto {

    private Long id;

    private String name;

    private String description;

    private Long tokenExpiration;

}
