package com.se.activityservice.entity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class User {
    private Long id;
    private String username;
    private String password;
    private String mail;
    private String imgUrl;
    private Integer role;

    public void setRole(Integer role) {
        this.role = role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }

    public User() {
    }
}