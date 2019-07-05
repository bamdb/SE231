package com.se.topicservice.entity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;

public class User {
    private Long id;
    private String username;
    private String password;
    private String mail;
    private String imgUrl;
    private Integer role;

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
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

    public String getImgUrl() {
        return imgUrl;
    }

    public String getMail() {
        return mail;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }

    public User(long id, String username, String password, String mail, String imgUrl, Integer role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.imgUrl = imgUrl;
        this.mail = mail;
        this.role = role;
    }

    public User() {
    }
}