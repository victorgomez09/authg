package com.vira.authg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vira.authg.model.Application;
import com.vira.authg.model.ApplicationType;
import com.vira.authg.model.User;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByOwner(User owner);

    List<Application> findByType(ApplicationType type);

    Optional<Application> findByName(String name);

    Optional<Application> findByClientId(String clientId);
}
