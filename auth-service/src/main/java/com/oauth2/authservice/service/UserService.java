package com.oauth2.authservice.service;

import com.oauth2.authservice.domain.User;

public interface UserService {
    User create(User user);
    User changeRole(String username, String roleName, Character c);
    User changeRevokeAuthority(String username, String revokeAuthorityName, Character c);
    User disableUser(String username);
    User findUser(String username);
}
