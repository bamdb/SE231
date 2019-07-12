package com.se.itemservice.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "Item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "itemname", nullable = false)
    private String itemname;
    @Column(name = "pub_time", columnDefinition = "TIMESTAMP")
    private Timestamp pubTime;
    @Column(name = "chapter_num", nullable = false)
    private Integer chapterNum;
    @Column(name = "main_author")
    private String mainAuthor;
    @Column(name = "imgurl")
    private String imgurl;
    @Column(name = "type", nullable = false)
    private Integer type;

    private List<Item> relationPrior;
    private List<Item> relationSubsequent;
    private List<Item> relationNormal;

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

    public void setChapterNum(Integer chapterNum) {this.chapterNum = chapterNum;}

    public String getMainAuthor() {return mainAuthor;}

    public void setMainAuthor(String mainAuthor) {this.mainAuthor = mainAuthor;}

    public String getImgurl() {return imgurl;}

    public void setImgurl(String imgurl) {this.imgurl = imgurl;}


    public List<Item> getRelationPrior() {
        return relationPrior;
    }

    public void setRelationPrior(List<Item> relationPrior) {
        this.relationPrior = relationPrior;
    }

    public List<Item> getRelationSubsequent() {
        return relationSubsequent;
    }

    public void setRelationSubsequent(List<Item> relationSubsequent) {
        this.relationSubsequent = relationSubsequent;
    }

    public List<Item> getRelationNormal() {
        return relationNormal;
    }

    public void setRelationNormal(List<Item> relationNormal) {
        this.relationNormal = relationNormal;
    }


}