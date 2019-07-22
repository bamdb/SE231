package com.se.authservice.controller;

import com.se.authservice.entity.User;
import com.se.authservice.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class UserController {
    @Resource(name="userServiceImpl")
    private UserService userService;

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping(value ="/id/{id}", produces ="application/json")
    public User getUser(@PathVariable("id") Long id) {
        User user = userService.selectUserById(id);
        if (user != null) return userService.truncate(user);
        else return null;
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping(value ="/user", produces ="application/json")
    public User getUser(Authentication authentication) {
        User user = userService.selectByUsername(authentication.getName());
        if (user == null) return null;
        return userService.truncate(user);
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<User> getAllUsers() {
        Iterable<User> it = userService.selectAll();
        it.forEach(user -> user = userService.truncate(user));
        return it;
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping(value="/username/{username}", produces="application/json")
    public User selectByUsername(@PathVariable("username") String username) {
        User user = userService.selectByUsername(username);
        if (user != null) return userService.truncate(user);
        else return null;
    }

    @PreAuthorize("hasRole('ADMIN') or principal.username == #username")
    @PutMapping(value="/update/{username}", produces="application/json")
    public User updateUser(@PathVariable("username") String username,
                           @RequestParam(value = "id", defaultValue = "0") Long id,
                           @RequestParam(value = "password", defaultValue = "") String password,
                           @RequestParam(value = "mail", defaultValue = "") String mail,
                           @RequestParam(value = "imgUrl", defaultValue = "") String imgUrl) {
        User user = new User();
        user.setId(id);
        user.setPassword(password);
        user.setMail(mail);
        user.setUsername(username);
        user.setImgUrl(imgUrl);
        return userService.truncate( userService.updateUser(user) );
    }

    @PreAuthorize("hasRole('ADMIN') or principal.username == #username")
    @DeleteMapping(value="/delete/username/{username}")
    public void deleteUserByUsername(
            @PathVariable("username") String username) {
        userService.deleteUserByUsername(username);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value="/delete/id/{id}")
    public void deleteUserById(
            @PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }

}
