package com.vira.authg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.ApplicationScopesDto;
import com.vira.authg.dto.UserDto;
import com.vira.authg.exception.ResourceNotFoundException;
import com.vira.authg.model.Application;
import com.vira.authg.model.ApplicationScope;
import com.vira.authg.model.User;
import com.vira.authg.repository.ApplicationRepository;
import com.vira.authg.repository.UserRepository;
import com.vira.authg.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(user -> UserDto.builder().id(user.getId()).name(user.getName())
                        .email(user.getEmail())
                        .applicationScopes(user.getApplicationScopes().stream()
                                .map(s -> ApplicationScopesDto.builder()
                                        .scope(s.getScope())
                                        .description(s.getDescription())
                                        .application(ApplicationDto.builder()
                                                .id(s.getApplication()
                                                        .getId())
                                                .name(s.getApplication()
                                                        .getName())
                                                .build())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public UserDto findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return UserDto.builder().id(user.getId()).email(user.getEmail()).name(user.getName())
                .applicationScopes(user.getApplicationScopes().stream()
                        .map(s -> ApplicationScopesDto.builder().scope(s.getScope())
                                .description(s.getDescription())
                                .application(ApplicationDto.builder()
                                        .id(s.getApplication().getId())
                                        .name(s.getApplication().getName())
                                        .build())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public User addApplicationToUser(User user, Application app) {
        // List<Application> apps = user.getApplications();
        // apps.add(app);

        // user.setApplications(apps);
        // return userRepository.save(user);
        return null;
    }

    @Override
    public UserDto addUserScopes(Long id, List<ApplicationScopesDto> data) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setApplicationScopes(data.stream().map(s -> ApplicationScope.builder().scope(s.getScope())
                .description(s.getDescription()).application(applicationRepository.getById(s.getApplication().getId()))
                .build()).collect(Collectors.toList()));

        user = userRepository.save(user);

        return UserDto.builder().id(user.getId()).email(user.getEmail()).name(user.getName())
                .applicationScopes(user.getApplicationScopes().stream()
                        .map(s -> ApplicationScopesDto.builder().scope(s.getScope())
                                .description(s.getDescription())
                                .application(ApplicationDto.builder()
                                        .id(s.getApplication().getId())
                                        .name(s.getApplication().getName())
                                        .build())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

}
