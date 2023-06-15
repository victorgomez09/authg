package com.vira.authg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.ApplicationAuthorizationDto;
import com.vira.authg.exception.ApplicationAuthorizationException;
import com.vira.authg.exception.ResourceNotFoundException;
import com.vira.authg.model.Application;
import com.vira.authg.repository.ApplicationRepository;
import com.vira.authg.security.TokenProvider;
import com.vira.authg.security.UserPrincipal;
import com.vira.authg.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private TokenProvider tokenProvider;

    // TODO: Generate token based on user data like email and scopes, checking
    // application id and secret
    @Override
    public String generateAppToken(ApplicationAuthorizationDto data, UserPrincipal userPrincipal) {
        Application app = applicationRepository.findByClientId(data.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "clientId",
                        data.getClientId()));

        if (!app.getClientSecret().equals(data.getClientSecret())) {
            throw new ApplicationAuthorizationException(app.getClientId(),
                    app.getClientSecret());
        }

        return tokenProvider.createApplicationToken(userPrincipal.getEmail(), app.getIdentifier(), app.getDomain());
    }

}
