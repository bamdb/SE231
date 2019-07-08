package com.se.friendservice.entity;

import org.junit.Assert;
import org.junit.Test;

public class FriendTest {
    @Test
    public void testFriend() {
        Friend friend = new Friend(1L, 1L, 1L);
        Assert.assertEquals((Long)1L, friend.getId());
        Friend friend2 = new Friend(1L, 1L, 1);
        Assert.assertEquals((Integer)1, friend2.getStatus());
    }


}
