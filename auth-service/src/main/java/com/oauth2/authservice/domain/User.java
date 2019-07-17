package com.oauth2.authservice.domain;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import javax.persistence.*;
import javax.validation.constraints.AssertTrue;
import java.util.*;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="username", nullable=false, unique = true)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="mail")
    private String mail;

    @Column(name="img_url")
    private String imgUrl;


    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;


    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @JoinTable(
            name = "users_revoked_authorities",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "authority_id", referencedColumnName = "id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "authority_id"}))
    private Collection<Role> revokeAuthorities;


    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
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

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
            List<GrantedAuthority> authorities
                    = new ArrayList<>();
            if (roles != null)
                for (Role role: roles) {
                    authorities.add(new SimpleGrantedAuthority(role.getName()));
                    role.getAuthorities().stream()
                            .map(p -> new SimpleGrantedAuthority(p.getName()))
                            .forEach(authorities::add);
                }
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public User(String username, String password, String mail, String imgUrl) {
        setImgUrl(imgUrl);
        setMail(mail);
        this.password = password;
        setUsername(username);
    }

    public User(String username, String password) {
        setUsername(username);
        this.password = password;
    }
    public User() {}
}