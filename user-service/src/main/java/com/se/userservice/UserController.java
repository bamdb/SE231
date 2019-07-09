package com.se.userservice;


import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;


@RestController

public class UserController {
    @Resource(name="userServiceImpl")
    private UserService userService;

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<User> getAllUsers() {
        return userService.selectAll();
    }

    @GetMapping(value="/id/{id}", produces="application/json")
    public User getUserById(@PathVariable("id") Long userId) {
        return userService.selectById(userId);
    }

    @PostMapping(value="/signup", produces="application/json")
    public User postUser(@RequestBody User user) {
        return userService.postUser(user);
    }

    @GetMapping(value="/username/{username}", produces="application/json")
    public User selectByUsername(@PathVariable("username") String username) {
        return userService.selectByUsername(username);
    }

    @PutMapping(value="/update/{username}", produces="application/json")
    public User updateUser(@PathVariable("username") String username,
                           @RequestParam(value = "password", defaultValue = "") String password,
                           @RequestParam(value = "mail", defaultValue = "") String mail,
                           @RequestParam(value = "imgUrl", defaultValue = "") String imgUrl,
                           @RequestParam(value = "role", defaultValue = "-1") Integer role) {
        User user = userService.selectByUsername(username);
        if (user == null) return null;
        if (!"".equals(password)) user.setPassword(password);
        if (!"".equals(mail)) user.setMail(mail);
        if (!"".equals(imgUrl)) user.setImgUrl(imgUrl);
        if (role != -1) user.setRole(role);
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

}
