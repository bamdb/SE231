package com.se.authservice.entity;

import org.springframework.security.core.GrantedAuthority;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.Collection;

public class MyPrincipal implements Principal {
    private Long id;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;

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

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public MyPrincipal() {
    }


    @Override
    public String getName() {
        return null;
    }

}
