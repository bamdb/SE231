package com.se.messageservice;

import org.bson.BsonTimestamp;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

public class MessageTest {

    @Test
    public void testMessage() {
        Timestamp s = new Timestamp(1);
        Message message = new Message("1", 1L, 2L, s, "");
        Assert.assertEquals(s, message.getSendTime());
    }
}
