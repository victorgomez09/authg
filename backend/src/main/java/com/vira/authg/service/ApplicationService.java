package com.vira.authg.service;

import java.util.List;

import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationUpdateDto;

public interface ApplicationService {
    ApplicationDto findById(Long id);

    ApplicationDto findByClientId(String clientId);

    List<ApplicationDto> findAllByUser(Long user);

    ApplicationDto create(ApplicationCreateDto data);

    ApplicationDto update(ApplicationUpdateDto data);

    Void delete(Long id);
}
