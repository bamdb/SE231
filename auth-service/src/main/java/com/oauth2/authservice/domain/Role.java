package com.oauth2.authservice.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @JoinTable(
            name = "roles_authorities",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "authority_id", referencedColumnName = "id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"role_id", "authority_id"}))
    private Collection<Authority> authorities;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<User> getUsers() {
        return users;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    public Collection<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<Authority> authorities) {
        this.authorities = authorities;
    }

    public Role(String name, Collection<User> users, Collection<Authority> authorities) {
        this.name = name;
        this.users = users;
        this.authorities = authorities;
    }

    public Role(String name) {
        this.name = name;
    }
    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Role() {

    }
}


