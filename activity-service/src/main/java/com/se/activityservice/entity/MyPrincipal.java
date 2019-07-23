package com.se.activityservice.entity;

import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;
import java.util.HashSet;

public class MyPrincipal implements Principal {
    public Long id;
    public String username;
    public Collection<? extends GrantedAuthority> authorities = new HashSet<>(0);
    public Collection<String> scope = new HashSet<>(0);

    public Collection<String> getScope() {
        return scope;
    }

    public void setScope(Collection<String> scope) {
        this.scope = scope;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public MyPrincipal(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public MyPrincipal() {
    }

    @Override
    public String getName() {
        return username;
    }
}