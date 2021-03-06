package com.se.commentservice;

import com.se.commentservice.entity.Comment;
import org.junit.Test;
import org.junit.Assert;

import java.sql.Timestamp;

public class CommentTest {
    @Test
    public void testComment() {
       Comment comment = new Comment();
       Assert.assertNull(comment.getId());
       Comment comment1 = new Comment(1L, 2L, new Timestamp(0), "0");
       Assert.assertEquals((Long)1L, comment1.getItemId());
       Assert.assertEquals((Long)2L, comment1.getUserId());
       Assert.assertEquals(new Timestamp(0), comment1.getPubTime());
       Assert.assertEquals("0", comment1.getContent());
       Comment comment2 = new Comment("1", 1L, 2L, new Timestamp(0), "0");
       Assert.assertEquals("1", comment2.getId());
    }

}