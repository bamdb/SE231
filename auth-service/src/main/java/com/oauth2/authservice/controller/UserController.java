package com.oauth2.authservice.controller;


import com.oauth2.authservice.domain.User;
import com.oauth2.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;


@RestController
@Slf4j
public class UserController {
    @Resource(name= "userServiceImpl")
    private UserService userService;

    @Autowired
    private ConsumerTokenServices consumerTokenServices;


    @PostMapping(value="/signup", produces="application/json")
    public User create(@RequestBody User user) {
        User u = userService.create(user);
        if (u != null) log.info("New userDetail has been created: {}", user.getUsername());
        else log.error("Fail to create userDetail!");
        return u;
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @DeleteMapping(value="/exit", produces="application/json")
    public ResponseEntity<?> revokeToken(@RequestParam("access_token") String accessToken) {
        if (consumerTokenServices.revokeToken(accessToken))
            return ResponseEntity.ok().body("Revoke Succeeded!");

        else return ResponseEntity.badRequest().body("Revoke Failed!");
    }
}