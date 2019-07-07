package com.se.ratingservice.entity;

import javax.persistence.*;
import java.sql.Timestamp;

public class Item {
    private Long id;
    private String itemname;
    private Timestamp pubTime;
    private Integer chapterNum;
    private String mainAuthor;
    private String imgurl;
    private Integer type;

    public Long getId() {return id;}

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public void setId(Long id) {this.id = id;}

    public String getItemname() {return itemname;}

    public void setItemname(String itemname) {this.itemname = itemname;}

    public Timestamp getPubTime() {return pubTime;}

    public void setPubTime(Timestamp pubTime) {this.pubTime = pubTime;}

    public int getChapterNum() {return chapterNum;}

    public void setChapterNum(Integer chapterNum) {
        this.chapterNum = chapterNum;
    }

    public String getMainAuthor() {return mainAuthor;}

    public void setMainAuthor(String mainAuthor) {this.mainAuthor = mainAuthor;}

    public String getImgurl() {return imgurl;}

    public void setImgurl(String imgurl) {this.imgurl = imgurl;}
}