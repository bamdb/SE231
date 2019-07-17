package com.oauth2.userservice.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.oauth2.userservice.client.AuthClient;
import com.oauth2.userservice.domain.User;
import com.oauth2.userservice.service.UserService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.Optional;


@RestController
public class UserController {
    @Autowired
    AuthClient authClient;
    @Resource(name="userServiceImpl")
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<User> getAllUsers() {
        return userService.selectAll();
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping(value="/id/{id}", produces="application/json")
    public User getUserById(@PathVariable("id") Long userId) {
        return userService.selectById(userId);
    }

    @PostMapping(value="/signup", produces="application/json")
    public User postUser(@RequestBody User user) {

        return authClient.postUser(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value="/username/{username}", produces="application/json")
    public User selectByUsername(@PathVariable("username") String username) {
        return userService.selectByUsername(username);
    }

    @PreAuthorize("hasRole('ADMIN') or hasPermission('/update/' + #username, new Permission('READ'))")
    @PutMapping(value="/update/{username}", produces="application/json")
    public User updateUser(@PathVariable("username") String username,
                           @RequestParam(value = "password", defaultValue = "") String password,
                           @RequestParam(value = "mail", defaultValue = "") String mail,
                           @RequestParam(value = "imgUrl", defaultValue = "") String imgUrl) {
        User user = userService.selectByUsername(username);
        if (user == null) return null;
        if (!"".equals(password)) user.setPassword(password);
        if (!"".equals(mail)) user.setMail(mail);
        if (!"".equals(imgUrl)) user.setImgUrl(imgUrl);
        return userService.updateUser(user);
    }

    @DeleteMapping(value="/delete/id/{id}")
    public void deleteUserById(
            @PathVariable("id") Long id) {
            userService.deleteUserById(id);
    }

    @DeleteMapping(value="/delete/username/{username}")
    public void deleteUserByUsername(
            @PathVariable("username") String username) {
        userService.deleteUserByUsername(username);
    }


    @PreAuthorize("hasRole('ADMIN') && hasAuthority('doUsers') && #oauth2.hasScope('server')")
    @GetMapping(value="/test", produces="application/json")
    public String postUser() {

        return "Succeed!!!!";
    }

}
