package com.se.messageservice;

import com.se.messageservice.entity.Message;
import org.junit.Assert;
import org.junit.Test;

import java.sql.Timestamp;

public class MessageTest {

    @Test
    public void testMessage() {
        Timestamp s = new Timestamp(1);
        Message message = new Message("1", 1L, 2L, s, "");
        Assert.assertEquals(s, message.getSendTime());
    }
}
