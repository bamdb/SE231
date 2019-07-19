package com.se.authservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;

@Entity
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;


    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Collection<User> users;


    @ManyToMany
    @JoinTable(
            name = "roles_authorities",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(
                    name = "authority_id", referencedColumnName = "id", nullable = false),
            uniqueConstraints = @UniqueConstraint(columnNames = {"role_id", "authority_id"}))
    @JsonIgnore
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

    public Role(String name) {
        this.name = name;
    }
    public Role(Long id, String name) {
        setId(id);
        setName(name);
        users = new HashSet<>(0);
        authorities = new HashSet<>(0);
    }
    public Role() {

    }
}


