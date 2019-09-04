package com.se.authservice.domain;

import com.se.authservice.entity.Qrcode;
import org.bson.types.Binary;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class QrcodeTest {
    @Test
    public void testQrcode() {
        byte[] bytes = "a".toString().getBytes();
        Qrcode qrcode = new Qrcode("123", new Binary(bytes));
        qrcode.setId("1");
        Assert.assertEquals(qrcode.getId(), "1");
        qrcode.setImageId("321");
        Assert.assertEquals(qrcode.getImageId(), "321");
    }
}
