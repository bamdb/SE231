package com.se.authservice.controller;

import com.se.authservice.domain.User;
import com.se.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;

@RestController
public class AuthController {
    @Resource(name = "userServiceImpl")
    private UserService userService;

    private final DefaultTokenServices defaultTokenServices;

    @Autowired
    public AuthController(DefaultTokenServices defaultTokenServices) {
        this.defaultTokenServices = defaultTokenServices;
    }

    @PostMapping(value = "/signup", produces = "application/json")
    public User create(@RequestBody User user) {
        User u = new User();
        try {
            u = userService.create(user);
        } catch (IllegalArgumentException e){
            return null;
        } finally {
            userService.changeRole(u.getUsername(), "ROLE_USER", "+");
        }
        return u;
    }

    @Transactional
    @DeleteMapping(value = "/exit", produces = "application/json")
    public ResponseEntity<?> revokeToken(@RequestParam("access_token") String accessToken) {
        defaultTokenServices.revokeToken(accessToken);
        return ResponseEntity.ok().body("Logout Succeeded!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/grant/role/{role}", produces = "application/json")
    public ResponseEntity<?> grantRole(@PathVariable("role") String roleName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") String c) {
        User user = userService.selectByUsername(username);
        if (user == null) return ResponseEntity.status(666).body("No User Found!");
        if (!"+".equals(c) && !"-".equals(c)) return ResponseEntity.status(666).body("Operation '+' or '-' Is Required!");
        userService.changeRole(username, roleName, c);
        return ResponseEntity.ok().body("Good For You!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/revoke/authority/{authority}", produces = "application/json")
    public ResponseEntity<?> revokeAuthority(@PathVariable("authority") String authorityName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") String c) {
        User user = userService.selectByUsername(username);
        if (user == null) return ResponseEntity.status(777).body("No User Found!");
        if (!"+".equals(c) && !"-".equals(c)) return ResponseEntity.status(777).body("Operation '+' or '-' Is Required!");
        userService.changeRevokeAuthority(username, authorityName, c);
        return ResponseEntity.ok().body("Good For You!");
    }


}
