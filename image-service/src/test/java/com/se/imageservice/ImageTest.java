package com.se.imageservice;

import com.se.imageservice.entity.Image;
import org.bson.types.Binary;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

public class ImageTest {
    @Test
    public void testImage() throws IOException {
        Image image = new Image("", 1L, new Binary( new MockMultipartFile("image", "filename.png", "text/plain", "some xml".getBytes()).getBytes()));
        Assert.assertEquals((Long)1L, image.getImageId());
    }
}
