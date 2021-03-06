package com.se.authservice.service;


import com.se.authservice.entity.User;

import javax.security.auth.login.AccountExpiredException;

public interface UserService {
    User create(int hashCode);
    User changeRole(String username, String roleName, String c);
    User changeRevokeAuthority(String username, String revokeAuthorityName, String c);
    User disableUser(String username);

    User selectUserById(Long id);
    Iterable<User> selectAll();
    User selectByUsername(String username);
    User updateUser(User user);
    void deleteUserByUsername(String username);
    void deleteUserById(Long id);
    User truncate(User user);
    int verification(User user) throws Exception;
    String qrencode() throws Exception;
    void saveToken(String uuid, String accessToken);
//    String getToken(String uuid);
    byte[] getQrcode(String uuid);
}
