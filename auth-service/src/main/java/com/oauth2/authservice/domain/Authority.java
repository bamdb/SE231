package com.oauth2.authservice.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
public class Authority implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "authorities")
    private Collection<Role> roles;

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

    public Authority(String name, Collection<Role> roles, Collection<User> users) {
        this.name = name;
        this.roles = roles;
        this.users = users;
    }

    public Authority(String name) {
        this.name = name;
    }

    public Authority() {

    }

}