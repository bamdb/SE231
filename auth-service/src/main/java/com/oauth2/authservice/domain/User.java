package com.oauth2.authservice.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.util.*;

@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User implements UserDetails {
    private static final long serialVersionUID = 4151898811080960799L;

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

    @JsonIgnore
    @Column(name="enabled")
    private Boolean enabled;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id", nullable = false))
    private Collection<Role> roles;

    @ManyToMany
    @JoinTable(
            name = "users_revoked_authorities",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(
                    name = "authority_id", referencedColumnName = "id", nullable = false),
            uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "authority_id"}))
    private Collection<Authority> revokeAuthorities;

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

    @JsonIgnore
    public Collection<Role> getRoles() {
        return roles;
    }

    @JsonIgnore
    public Collection<Authority> getRevokeAuthorities() {
        return revokeAuthorities;
    }

    @JsonIgnore
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
            revokeAuthorities.stream().map(p -> new SimpleGrantedAuthority(p.getName()))
                    .forEach(authorities::remove);
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRevokeAuthorities(Collection<Authority> revokeAuthorities) {
        this.revokeAuthorities = revokeAuthorities;
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