package com.vira.authg.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationScopesDto;
import com.vira.authg.dto.ApplicationUpdateDto;

public interface ApplicationService {
    ApplicationDto findById(Long id);

    ApplicationDto findByClientId(String clientId);

    List<ApplicationDto> findAllByUser(String userEmail);

    List<ApplicationDto> findAllByType(String type);

    Boolean authorize(HttpServletRequest request);

    ApplicationDto create(ApplicationCreateDto data, Long userId);

    ApplicationDto update(ApplicationUpdateDto data);

    List<ApplicationScopesDto> addApplicationScopes(Long id, ApplicationScopesDto data);

    Void delete(Long id);
}
