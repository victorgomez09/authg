package com.vira.authg.service;

import java.util.List;

import com.vira.authg.dto.ApplicationScopesDto;
import com.vira.authg.dto.UserDto;
import com.vira.authg.model.Application;
import com.vira.authg.model.User;

public interface UserService {
    List<UserDto> findAll();

    UserDto findUserById(Long id);

    User addApplicationToUser(User user, Application app);

    UserDto addUserScopes(Long id, List<ApplicationScopesDto> data);
}
