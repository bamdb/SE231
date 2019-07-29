package com.se.authservice.service;

import com.se.authservice.entity.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;

import static org.junit.Assert.fail;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {
    @Autowired
    UserService userService;
    @Test(expected = IllegalArgumentException.class)
    public void testUserService() {
        User user = new User("john1", "0");
        user.setMail("574402791@qq.com");
        int hashCode = 0;
        int hashCode1 = 0;
        try {
            hashCode = userService.verification(user);
            hashCode1 = userService.verification(user);
        }catch (Exception e) {
            fail();
        }
        userService.create(hashCode);
        try {
            userService.verification(user);
            fail();
        }catch (Exception e) {

        }
        Assert.assertNotNull(userService.disableUser("john1"));
        Assert.assertNull(userService.create(hashCode1));
        Assert.assertNull(userService.create(1));
    }

    @Test
    public void testQrcode() throws Exception {
        String uuid = userService.qrencode();
        userService.getQrcode("000");
        byte[] qrcode = userService.getQrcode(uuid);
        ByteArrayInputStream in = new ByteArrayInputStream(qrcode);
        BufferedImage image = ImageIO.read(in);
        userService.saveToken(uuid , "token");
        String token = userService.getToken(uuid);
        Assert.assertEquals(uuid, "token");
    }
}
