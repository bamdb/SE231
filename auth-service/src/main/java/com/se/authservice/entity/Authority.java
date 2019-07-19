package com.se.authservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
public class Authority implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "authorities")
    @JsonIgnore
    private Collection<Role> roles;

    @JsonIgnore
    @ManyToMany(mappedBy = "revokeAuthorities")
    private Collection<User> users;

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

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    public Collection<User> getUsers() {
        return users;
    }



    public Authority(String name, Long id) {
        setName(name);
        setId(id);
    }
    public Authority(String name) {
        setName(name);
    }

    public Authority() {

    }

}