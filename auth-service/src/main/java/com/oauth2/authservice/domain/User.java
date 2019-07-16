package com.oauth2.authservice.domain;

import org.springframework.security.authentication.jaas.AuthorityGranter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames={"username"})})
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="username", nullable=false)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="mail")
    private String mail;

    @Column(name="img_url")
    private String imgUrl;

//    private Collection<? extends GrantedAuthority> authorities;
//
//    @Column(name="role", columnDefinition = "varchar('10') default 'ROLE_USER'")
//    private Integer role;

//    public Integer getRole() {
//        return role;
//    }

//    public void setRole(Integer role) {
//        this.role = role;
//    }

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
        return null;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        this.password = encoder.encode(password);
        this.password = password;
    }

    public User(long id, String username, String password, String mail, String imgUrl) {
        setId(id);
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