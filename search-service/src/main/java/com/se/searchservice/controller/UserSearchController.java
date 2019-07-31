package com.se.searchservice.controller;

import com.se.searchservice.entity.Item;
import com.se.searchservice.entity.User;
import com.se.searchservice.service.SearchItemService;
import com.se.searchservice.service.SearchUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class UserSearchController {
    @Resource(name = "searchUserServiceImpl")
    SearchUserService searchUserService;

    @GetMapping("/ik/user")
    public Page<User> test(@RequestParam("keystring") String keystring,
                           @RequestParam("page") int page,
                           @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = searchUserService.searchUser(keystring, pageable);
        return users;
    }
}
