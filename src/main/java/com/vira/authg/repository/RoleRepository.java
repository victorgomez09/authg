package com.vira.authg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vira.authg.entity.Role;

import java.util.Collection;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Collection<Role> findAllByName(String name);
    Boolean existsByName(String name);

}
