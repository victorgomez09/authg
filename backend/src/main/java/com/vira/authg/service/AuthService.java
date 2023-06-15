package com.vira.authg.service;

import com.vira.authg.dto.ApplicationAuthorizationDto;
import com.vira.authg.security.UserPrincipal;

public interface AuthService {
    String generateAppToken(ApplicationAuthorizationDto data, UserPrincipal userPrincipal);
}
