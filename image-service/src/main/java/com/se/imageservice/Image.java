package com.se.imageservice;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Image {
    @Id
    private String id;

    private Long bookId;

    private Binary image;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public Image() {
    }

    public Image(Long bookId, Binary image) {
        this.bookId = bookId;
        this.image = image;
    }

    public Image(String id, Long bookId, Binary image) {
        this.id = id;
        this.bookId = bookId;
        this.image = image;
    }
}