package com.vira.authg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.ApplicationCreateDto;
import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationUpdateDto;
import com.vira.authg.exception.ResourceDuplicateException;
import com.vira.authg.exception.ResourceNotFoundException;
import com.vira.authg.model.Application;
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

        return ApplicationDto.builder().name(app.getName()).description(app.getDescription())
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
                .map(app -> ApplicationDto.builder().name(app.getName()).description(app.getDescription())
                        .identifier(app.getIdentifier()).tokenExpiration(app.getTokenExpiration())
                        .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                        .owner(app.getOwner())
                        .creationDate(app.getCreationDate()).build())
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationDto findByClientId(String clientId) {
        Application app = repository.findByClientId(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "clientId", clientId));

        return ApplicationDto.builder().name(app.getName()).description(app.getDescription())
                .identifier(app.getIdentifier()).tokenExpiration(app.getTokenExpiration())
                .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                .owner(app.getOwner())
                .creationDate(app.getCreationDate()).build();
    }

    @Override
    public ApplicationDto create(ApplicationCreateDto data) {
        repository.findByName(data.getName()).ifPresent(user1 -> {
            throw new ResourceDuplicateException("Application", "id", data.getId());
        });

        Application app = repository
                .save(Application.builder().name(data.getName()).description(data.getDescription()).type(data.getType())
                        .signingAlgorithm(data.getSigningAlgorithm()).tokenExpiration(data.getTokenExpiration())
                        .domain(utils.generateApplicationDomain()).clientId(utils.generateApplicationClientId())
                        .clientSecret(utils.generateApplicationClientSecret())
                        .build());

        return ApplicationDto.builder().name(app.getName()).description(app.getDescription())
                .identifier(app.getIdentifier()).tokenExpiration(app.getTokenExpiration())
                .domain(app.getDomain()).clientId(app.getClientId()).clientSecret(app.getClientSecret())
                .owner(app.getOwner())
                .creationDate(app.getCreationDate()).build();
    }

    @Override
    public ApplicationDto update(ApplicationUpdateDto data) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public Void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

}
