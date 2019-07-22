package com.se.activityservice.entity;

import java.security.Principal;

public class MyPrincipal implements Principal {
    public Long id;
    public String username;

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
