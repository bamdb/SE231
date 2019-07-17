package com.oauth2.userservice.controller;


import com.oauth2.userservice.client.AuthClient;
import com.oauth2.userservice.domain.User;
import com.oauth2.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;


@RestController
public class UserController {

    @Autowired
    AuthClient authClient;
    @Resource(name="userServiceImpl")
    private UserService userService;

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<User> getAllUsers() {
        return userService.selectAll();
    }

    @PostMapping(value="/signup", produces="application/json")
    public User postUser(@RequestBody User user) {
        return authClient.postUser(user);
    }

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

    @DeleteMapping(value="/delete/username/{username}")
    public void deleteUserByUsername(
            @PathVariable("username") String username) {
        userService.deleteUserByUsername(username);
    }


//    @PreAuthorize("hasRole('EDITOR') && #oauth2.hasScope('server')")
//    @GetMapping(value="/test", produces="application/json")
//    public String postUser() {
//        return "Succeed!!!!";
//    }

}