package com.se.authservice.entity;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.image.BufferedImage;

@Document
public class Qrcode {
    @Id
    private String id;

    /*combined by type and id*/
    @Indexed(unique = true)
    private String imageId;

    private Binary image;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getImageId() {
        return imageId;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public Qrcode() {
    }

    public Qrcode(String imageId, Binary image) {
       setImageId(imageId);
       setImage(image);
    }

}