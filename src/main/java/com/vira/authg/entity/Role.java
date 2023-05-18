package com.vira.authg.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "t_role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;
    
    public Role(String name) {
        this.name = name;
    }
}
