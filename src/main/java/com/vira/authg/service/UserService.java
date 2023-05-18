package com.vira.authg.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vira.authg.dto.UserRegisterDTO;
import com.vira.authg.entity.Role;
import com.vira.authg.entity.User;
import com.vira.authg.exception.PasswordDoesNotMatchException;
import com.vira.authg.exception.UserNotFoundException;
import com.vira.authg.repository.UserRepository;

import java.util.Collection;

@RequiredArgsConstructor
@Service
public class UserService {
    
    private boolean adminExists;
    
    private final RoleService roleService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void checkCredentials(final String email, final String password)  {
        User user = this.userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(
                        "User with email: " + email + " was not found"
                ));

        boolean passwordMatches = this.passwordEncoder.matches(password, user.getPassword());
        if (!passwordMatches) {
            throw new PasswordDoesNotMatchException("The user password is not correct");
        }
    }
    
    public void createUser(final UserRegisterDTO userRegister) {
        if (!this.adminExists) {
            this.adminExists = true;
            Collection<Role> roles = this.roleService.getAdminRoles();
            this.createUser(userRegister, roles);
            return;
        }
        
        Collection<Role> roles = this.roleService.getDefaultRoles();
        this.createUser(userRegister, roles);
    }
    
    private void createUser(final UserRegisterDTO userRegister, final Collection<Role> roles) {
        String email = userRegister.getEmail();
        
        boolean userExists = this.userRepository.existsUserByEmail(email);
        if (userExists) {
            throw new IllegalStateException("User with email: " + email + " already exists");
        }
        
        String password = this.passwordEncoder.encode(userRegister.getPassword());
        User user = new User(email, password, roles);
        userRepository.save(user);
    }
    
    public Collection<Role> getUserRolesByEmail(final String email) {
        User user = this.userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(
                        "User with email: " + email + " was not found"
                ));
        return user.getRoles();
    }
}
