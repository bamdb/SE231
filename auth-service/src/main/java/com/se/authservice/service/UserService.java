package com.se.authservice.service;


import com.se.authservice.entity.User;

public interface UserService {
    User create(User user);
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
    User verification(User user);
}
