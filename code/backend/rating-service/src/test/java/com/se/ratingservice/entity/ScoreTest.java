package com.se.ratingservice.entity;

import org.junit.Assert;
import org.junit.Test;

public class ScoreTest {

    @Test
    public void testFriend() {
        Score score = new Score();
        score.setId(1L);
        score.setItemId(1L);
        score.setUserId(1L);
        score.setScore(9);
        Assert.assertEquals((Long)1L, score.getId());
        Assert.assertEquals((Long)1L, score.getItemId());
        Assert.assertEquals((Long)1L, score.getUserId());
        Assert.assertEquals(9, score.getScore());
    }
}
