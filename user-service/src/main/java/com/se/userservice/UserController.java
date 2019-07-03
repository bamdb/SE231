package com.se.userservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.List;

@RestController
public class UserController {
    @Resource(name = "userServiceImpl")
    private UserService userService;

    @GetMapping(value = "/user/all", produces = "application/json")
    List<User> getAllUsers() {
        return userService.selectAll();
    }
//    @GetMapping(value = "/user/{userId}", produces = "application/json")
//    User getUserById(@PathVariable("userId") Long userId) {
//        return userRepository.findById(userId).orElse(null);
//    };
//    }
}