package com.vira.authg.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.vira.authg.entity.Role;
import com.vira.authg.repository.RoleRepository;

import java.util.Collection;

@AllArgsConstructor
@Service
public class RoleService {
    
    private final RoleRepository roleRepository;

    public void createRole(final String roleName) {
        Role role = new Role(roleName);
        roleRepository.save(role);
    }

    public Collection<Role> getDefaultRoles() {
        return this.roleRepository.findAllByName("USER");
    }

    public Collection<Role> getAdminRoles() {
        return this.roleRepository.findAllByName("ADMIN");
    }
}
