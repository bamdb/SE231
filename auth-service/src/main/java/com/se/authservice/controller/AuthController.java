package com.se.authservice.controller;

import com.se.authservice.entity.User;
import com.se.authservice.helper.QRCodeUtil;
import com.se.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.annotation.Resource;
import javax.security.auth.login.AccountExpiredException;
import javax.transaction.Transactional;

@RestController
public class AuthController {
    @Resource(name = "userServiceImpl")
    private UserService userService;

    private final DefaultTokenServices defaultTokenServices;

    @Autowired
    public AuthController(DefaultTokenServices defaultTokenServices) {
        this.defaultTokenServices = defaultTokenServices;
    }

    @GetMapping(value = "/uuid")
    public String uuid() throws Exception {
        return userService.qrencode();
    }

    @GetMapping(value = "/qrcode")
    public byte[] qrcode(String uuid) {
        return userService.getQrcode(uuid);
    }

    @PutMapping(value = "/settoken")
    public void setToken(@RequestParam("uuid") String uuid, @RequestParam("token") String token) {
        userService.saveToken(uuid, token);
    }
//
//    @GetMapping(value = "/gettoken")
//    public String getToken(@RequestParam("uuid") String uuid) {
//        return userService.getToken(uuid);
//    }

    @PostMapping(value = "/verify", produces = "application/json")
    public int verify(@RequestBody User user) throws Exception{
        return userService.verification(user);
    }

    @GetMapping(value = "/signup", produces = "application/json")
    public RedirectView create(@RequestParam int hashCode) {
        User u = new User();
        try {
            u = userService.create(hashCode);
        } catch (IllegalArgumentException e){
            return null;
        } finally {
            userService.changeRole(u.getUsername(), "ROLE_USER", "+");
        }
        return new RedirectView("http://www.bamdb.cn");
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    @DeleteMapping(value = "/exit", produces = "application/json")
    public ResponseEntity<?> revokeToken(@RequestParam("access_token") String accessToken) {
        defaultTokenServices.revokeToken(accessToken);
        return ResponseEntity.ok().body("Logout Succeeded!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/grant/role/{role}", produces = "application/json")
    public ResponseEntity<?> grantRole(@PathVariable("role") String roleName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") String c) {
        User user = userService.selectByUsername(username);
        if (user == null) return ResponseEntity.status(666).body("No User Found!");
        if (!"+".equals(c) && !"-".equals(c)) return ResponseEntity.status(666).body("Operation '+' or '-' Is Required!");
        userService.changeRole(username, roleName, c);
        return ResponseEntity.ok().body("Good For You!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/revoke/authority/{authority}", produces = "application/json")
    public ResponseEntity<?> revokeAuthority(@PathVariable("authority") String authorityName,
                                       @RequestParam("username") String username,
                                       @RequestParam("operation") String c) {
        User user = userService.selectByUsername(username);
        if (user == null) return ResponseEntity.status(777).body("No User Found!");
        if (!"+".equals(c) && !"-".equals(c)) return ResponseEntity.status(777).body("Operation '+' or '-' Is Required!");
        userService.changeRevokeAuthority(username, authorityName, c);
        return ResponseEntity.ok().body("Good For You!");
    }


}
