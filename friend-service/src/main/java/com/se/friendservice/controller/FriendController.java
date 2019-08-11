package com.se.friendservice.controller;

import com.se.friendservice.client.UserClient;
import com.se.friendservice.config.intercepter.FeignRequestInterceptor;
import com.se.friendservice.service.FriendService;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class FriendController {
    private final
    FriendService friendService;
    @Autowired
    UserClient userClient;
    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/isfriend", produces = "application/json")
    Boolean isFriend(@RequestParam("userId1") Long userId1,
                     @RequestParam("userId2") Long userId2) {
        return friendService.isFriend(userId1, userId2);
    }

    @PreAuthorize("hasRole('USER') and (#friend.getUserId1() == authentication.principal.id ||#friend.getUserId2() == authentication.principal.id )")
    @PostMapping(value = "/addreq", produces = "application/json")
    void reqFriends(@RequestParam("userId") Long userId) {
        friendService.reqFriends(userId);
    }

    @PreAuthorize("hasRole('USER') and (#friend.getUserId1() == authentication.principal.id ||#friend.getUserId2() == authentication.principal.id )")
    @PostMapping(value = "/add", produces = "application/json")
    Friend addFriends(@RequestBody Friend friend) {
        return friendService.addFriends(friend);
    }

    @PreAuthorize("hasRole('USER') and (#userId1 == authentication.principal.id ||#userId2 == authentication.principal.id ) ")
    @DeleteMapping(value = "/delete")
    ResponseEntity<?> rmFriends(@RequestParam("userId1") Long userId1,
                                @RequestParam("userId2") Long userId2) {
        friendService.rmFriends(userId1, userId2);
        return ResponseEntity.ok().body("Delete successfully!");
    }

    @PreAuthorize("hasRole('ADMIN') or userId == authentication.principal.id")
    @DeleteMapping("/delete/userid/{userId}")
    ResponseEntity<?> rmAllFriends(@PathVariable("userId") Long userId) {
        friendService.rmAllFriends(userId);
        return ResponseEntity.ok().body("Delete successfully!");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/all/userid/{userId}", produces = "application/json")
    Iterable<User> getFriends(@PathVariable("userId") Long userId,
                              @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return friendService.getFriends(userId);
    }
}
