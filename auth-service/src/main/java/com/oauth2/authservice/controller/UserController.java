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
import org.springframework.security.oauth2.provider.TokenRequest;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.Map;


@RestController
@Slf4j
public class UserController {
    @Resource(name = "userServiceImpl")
    private UserService userService;

    @Autowired
    private DefaultTokenServices defaultTokenServices;

    @PostMapping(value = "/signup", produces = "application/json")
    public User create(@RequestBody User user) {
        User u = userService.create(user);
        if (u != null) log.info("New userDetail has been created: {}", user.getUsername());
        else log.error("Fail to create userDetail!");
        return u;
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @DeleteMapping(value = "/exit", produces = "application/json")
    public ResponseEntity<?> revokeToken(@RequestParam("access_token") String accessToken) {
        if (defaultTokenServices.revokeToken(accessToken))
            return ResponseEntity.ok().body("Revoke Succeeded!");
        else return ResponseEntity.badRequest().body("Revoke Failed!");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/test")
    public String test() {
        return "Authority is involved!";
    }

    @Autowired
    UserRepository userRepository;
    @PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(value = "/user", method = RequestMethod.GET,
            produces = "application/json; charset=utf-8")
    public User getDetail() {
        return (User) userRepository.findAll().iterator();
    }



    //    @PostMapping(value="/login")
//    public ResponseEntity<?> login( @RequestBody User user) {
//
//    }

}
