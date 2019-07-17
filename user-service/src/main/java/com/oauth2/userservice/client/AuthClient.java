package com.oauth2.userservice.client;

import com.oauth2.userservice.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Primary
@FeignClient(value = "auth", fallback = AuthFallback.class)
public interface AuthClient {

    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    User postUser(User user);

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<User> getAllUsers();

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

}