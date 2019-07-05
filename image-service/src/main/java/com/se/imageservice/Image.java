package com.se.imageservice;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Image {
    @Id
    private String id;

    /*combined by type and id*/
    @Indexed(unique = true)
    private Long imageId;

    private Binary image;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public Long getImageId() {
        return imageId;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public Image() {
    }

    public Image(Long imageId, Binary image) {
        this.imageId = imageId;
        this.image = image;
    }

    public Image(String id, Long imageId, Binary image) {
        this.id = id;
        this.imageId = imageId;
        this.image = image;
    }
}