package com.oauth2.userservice.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

public class User {
    private Long id;

    private String username;

    private String password;

    private String mail;

    private String imgUrl;

    private Boolean enabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public boolean isEnabled() {
        return this.enabled;
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
        this.password = password;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public User(String username, String password, String mail, String imgUrl) {
        setImgUrl(imgUrl);
        setMail(mail);
        setPassword(password);
        setUsername(username);
        this.roles = new HashSet<>(0);
        this.revokeAuthorities = new HashSet<>(0);
        this.enabled = true;
    }

    public User(String username, String password) {
        setUsername(username);
        setPassword(password);
        this.roles = new HashSet<>(0);
        this.revokeAuthorities = new HashSet<>(0);
        setEnabled(true);
    }

    public User() {
        this.roles = new HashSet<>(0);
        this.revokeAuthorities = new HashSet<>(0);
        setEnabled(true);
    }

}