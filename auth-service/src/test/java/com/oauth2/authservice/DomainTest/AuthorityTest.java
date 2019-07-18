package com.oauth2.authservice.DomainTest;

import com.oauth2.authservice.domain.Authority;
import com.oauth2.authservice.domain.Authority;
import com.oauth2.authservice.domain.Role;
import com.oauth2.authservice.domain.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AuthorityTest {
    @Test
    public void testAuthority() {
        Authority authority = new Authority("comment", 1L );
        Assert.assertEquals((Long)1L, authority.getId());
        authority.setRoles(Collections.singletonList(new Role(1L,"ROLE_ADMIN")));
        Assert.assertNotNull( authority.getRoles());
        authority.setUsers(Collections.singletonList(new User("name", "pass")));
        Assert.assertNotNull( authority.getUsers());
        authority.setName("Authority");
        Assert.assertEquals("Authority", authority.getName());
    }
}
