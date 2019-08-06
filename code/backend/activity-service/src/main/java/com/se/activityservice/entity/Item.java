package com.se.activityservice.entity;

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

    public void setType(Integer type) {
        this.type = type;
    }

    public void setId(Long id) {this.id = id;}

    public void setItemname(String itemname) {this.itemname = itemname;}

    public void setPubTime(Timestamp pubTime) {this.pubTime = pubTime;}

    public void setChapterNum(Integer chapterNum) {
        this.chapterNum = chapterNum;
    }

    public void setMainAuthor(String mainAuthor) {this.mainAuthor = mainAuthor;}

    public void setImgurl(String imgurl) {this.imgurl = imgurl;}


    public Long getId() {
        return id;
    }

    public String getItemname() {
        return itemname;
    }

    public Timestamp getPubTime() {
        return pubTime;
    }

    public Integer getChapterNum() {
        return chapterNum;
    }

    public String getMainAuthor() {
        return mainAuthor;
    }

    public String getImgurl() {
        return imgurl;
    }

    public Integer getType() {
        return type;
    }

}