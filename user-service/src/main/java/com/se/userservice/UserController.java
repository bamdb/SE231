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

    @PutMapping(value="/update", produces="application/json")
    public User updateUser(@RequestBody User user) {
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
