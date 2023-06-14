package com.vira.authg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.ApplicationDto;
import com.vira.authg.dto.UserDto;
import com.vira.authg.model.Application;
import com.vira.authg.model.User;
import com.vira.authg.repository.UserRepository;
import com.vira.authg.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(user -> UserDto.builder().id(user.getId()).name(user.getName())
                        .email(user.getEmail())
                        .applications(user.getApplications().stream().map(app -> ApplicationDto
                                .builder()
                                .id(app.getId()).name(app.getName())
                                .description(app.getDescription())
                                .identifier(app.getIdentifier()).type(app.getType())
                                .tokenExpiration(app.getTokenExpiration())
                                .domain(app.getDomain()).clientId(app.getClientId())
                                .clientSecret(app.getClientSecret())
                                .owner(app.getOwner())
                                .creationDate(app.getCreationDate()).build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public User addApplicationToUser(User user, Application app) {
        List<Application> apps = user.getApplications();
        apps.add(app);

        user.setApplications(apps);
        return userRepository.save(user);
    }

}
