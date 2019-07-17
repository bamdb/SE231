package com.se.friendservice.controller;

import com.se.friendservice.service.FriendService;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FriendController {
    private final
    FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @GetMapping(value = "/isfriend", produces = "application/json")
    Boolean isFriend(@RequestParam("userId1") Long userId1,
                     @RequestParam("userId2") Long userId2) {
        return friendService.isFriend(userId1, userId2);
    }


    @PostMapping(value = "/add", produces = "application/json")
    Friend addFriends(@RequestBody Friend friend) {
        return friendService.addFriends(friend);
    }

    @DeleteMapping(value = "/delete")
    ResponseEntity<?> rmFriends(@RequestParam("userId1") Long userId1,
                                @RequestParam("userId2") Long userId2) {
        friendService.rmFriends(userId1, userId2);
        return ResponseEntity.ok().body("Delete successfully!");
    }

    @DeleteMapping("/delete/userid/{userId}")
    ResponseEntity<?> rmAllFriends(@PathVariable("userId") Long userId) {
        friendService.rmAllFriends(userId);
        return ResponseEntity.ok().body("Delete successfully!");
    }

    @GetMapping(value = "/all/userid/{userId}", produces = "application/json")
    Iterable<User> getFriends(@PathVariable("userId") Long userId) {
        return friendService.getFriends(userId);
    }
}
