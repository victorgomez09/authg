package com.vira.authg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.ApplicationAuthorizationDto;
import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationUpdateDto;
import com.vira.authg.exception.ApplicationAuthorizationException;
import com.vira.authg.exception.ResourceDuplicateException;
import com.vira.authg.exception.ResourceNotFoundException;
import com.vira.authg.model.Application;
import com.vira.authg.model.ApplicationType;
import com.vira.authg.model.SigningAlgorithm;
import com.vira.authg.model.User;
import com.vira.authg.repository.ApplicationRepository;
import com.vira.authg.repository.UserRepository;
import com.vira.authg.service.ApplicationService;
import com.vira.authg.util.ApplicationUtils;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ApplicationUtils utils;

    @Override
    public ApplicationDto findById(Long id) {
        Application app = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));

        return ApplicationDto.builder().id(app.getId()).name(app.getName()).description(app.getDescription())
                .type(app.getType()).signingAlgorithm(app.getSigningAlgorithm())
                .identifier(app.getIdentifier()).tokenExpiration(app.getTokenExpiration())
                .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                .owner(app.getOwner())
                .creationDate(app.getCreationDate()).build();
    }

    @Override
    public List<ApplicationDto> findAllByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return repository.findByOwner(user).stream()
                .map(app -> ApplicationDto.builder().id(app.getId()).name(app.getName())
                        .type(app.getType())
                        .signingAlgorithm(app.getSigningAlgorithm())
                        .description(app.getDescription())
                        .identifier(app.getIdentifier())
                        .tokenExpiration(app.getTokenExpiration())
                        .domain(app.getDomain()).clientId(app.getClientId())
                        .clientSecret(app.getClientSecret())
                        .owner(app.getOwner())
                        .creationDate(app.getCreationDate()).build())
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationDto findByClientId(String clientId) {
        Application app = repository.findByClientId(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "clientId", clientId));

        return ApplicationDto.builder().id(app.getId()).name(app.getName()).description(app.getDescription())
                .identifier(app.getIdentifier()).tokenExpiration(app.getTokenExpiration())
                .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                .owner(app.getOwner())
                .creationDate(app.getCreationDate()).build();
    }

    @Override
    public ApplicationAuthorizationDto authorize(ApplicationAuthorizationDto data) {
        Application app = repository.findByClientId(data.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "clientId", data.getClientId()));

        if (!app.getClientSecret().equals(data.getClientSecret())) {
            throw new ApplicationAuthorizationException(app.getClientId(), app.getClientSecret());
        }

        return ApplicationAuthorizationDto.builder().name(app.getName()).clientId(data.getClientId())
                .clientSecret(data.getClientSecret()).build();
    }

    @Override
    public ApplicationDto create(ApplicationCreateDto data, Long userId) {
        repository.findByName(data.getName()).ifPresent(user1 -> {
            throw new ResourceDuplicateException("Application", "name", data.getName());
        });

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Application app = repository
                .save(Application.builder().name(data.getName()).description(data.getDescription())
                        .identifier(data.getIdentifier())
                        .type(ApplicationType.valueOf(data.getType()))
                        .signingAlgorithm(SigningAlgorithm.valueOf(data.getSigningAlgorithm()))
                        .tokenExpiration(data.getTokenExpiration())
                        .domain(utils.generateApplicationDomain())
                        .clientId(utils.generateApplicationClientId())
                        .clientSecret(utils.generateApplicationClientSecret())
                        .owner(user)
                        .build());

        return ApplicationDto.builder().id(app.getId()).name(app.getName()).description(app.getDescription())
                .identifier(app.getIdentifier()).type(app.getType())
                .tokenExpiration(app.getTokenExpiration())
                .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                .owner(app.getOwner())
                .creationDate(app.getCreationDate()).build();
    }

    @Override
    public ApplicationDto update(ApplicationUpdateDto data) {
        ;
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public Void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

}
