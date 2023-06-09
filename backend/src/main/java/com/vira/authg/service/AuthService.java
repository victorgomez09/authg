package com.vira.authg.service;

import com.vira.authg.dto.ApplicationAuthorizationDto;

public interface AuthService {
    String generateAppToken(ApplicationAuthorizationDto data);
}
