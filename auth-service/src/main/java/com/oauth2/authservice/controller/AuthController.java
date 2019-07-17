package com.oauth2.authservice.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.netflix.discovery.shared.transport.EurekaHttpResponse;
import com.oauth2.authservice.domain.User;
import com.oauth2.authservice.repository.UserRepository;
import com.oauth2.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.exceptions.UnsupportedGrantTypeException;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.TokenRequest;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@Slf4j
public class AuthController {
    @Resource(name = "userServiceImpl")
    private UserService userService;

    private final UserRepository repository;

    private final DefaultTokenServices defaultTokenServices;

    @Autowired
    public AuthController(UserRepository repository, DefaultTokenServices defaultTokenServices) {
        this.repository = repository;
        this.defaultTokenServices = defaultTokenServices;
    }

    @PostMapping(value = "/signup", produces = "application/json")
    public User create(@RequestBody User user) {
        User u = userService.create(user);
        if (u != null) {
            log.info("New userDetail has been created: {}", user.getUsername());
            userService.changeRole(u.getUsername(), "ROLE_USER", '+');
        }
        else log.error("Fail to create userDetail!");
        return u;
    }


    @DeleteMapping(value = "/logout", produces = "application/json")
    public ResponseEntity<?> revokeToken(@RequestParam("access_token") String accessToken) {
        if (defaultTokenServices.revokeToken(accessToken))
            return ResponseEntity.ok().body("Revoke Succeeded!");
        else return ResponseEntity.badRequest().body("Revoke Failed!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/grant/role/{role}", produces = "application/json")
    public ResponseEntity<?> grantRole(@PathVariable("role") String roleName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") Character c) {
        User user = userService.findUser(username);
        if (user == null) return ResponseEntity.status(666).body("No User Found!");
        if (c != '+' && c != '-') return ResponseEntity.status(666).body("Operation '+' or '-' Is Required!");
        userService.changeRole(username, roleName, c);
        return ResponseEntity.ok().body("Good For You!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/revoke/authority/{authority}", produces = "application/json")
    public ResponseEntity<?> revokeAuthority(@PathVariable("authority") String authorityName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") Character c) {
        User user = userService.findUser(username);
        if (user == null) return ResponseEntity.status(777).body("No User Found!");
        if (c != '+' && c != '-') return ResponseEntity.status(777).body("Operation '+' or '-' Is Required!");
        userService.changeRevokeAuthority(username, authorityName, c);
        return ResponseEntity.ok().body("Good For You!");
    }

    @PreAuthorize("principal.username.equals(#username)")
    @GetMapping("/test/{username}")
    public String test(@PathVariable("username") String username, Authentication authentication)
    {

        return "Authority is involved!";
    }


}
