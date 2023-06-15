package com.vira.authg.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "application_scope", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "scope" })
})
@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ApplicationScope {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "scope")
    private String scope;

    @Column(name = "description")
    private String description;

    @JoinColumn(name = "fk_application", nullable = false)
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Application application;

    @JoinTable(name = "application_scope_users", joinColumns = @JoinColumn(name = "application_scope_id", nullable = false), inverseJoinColumns = @JoinColumn(name = "user_id", nullable = false))
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> users;

    @CreationTimestamp
    @Column(name = "creation_date")
    private Date creationDate;

    @UpdateTimestamp
    @Column(name = "modification_date")
    private Date modificationDate;

}
