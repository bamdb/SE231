package com.se.itemservice;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "itemname")
    private String itemname;
    @Column(name = "pub_time")
    private Timestamp pubTime;
    @Column(name = "chapter_num")
    private int chapterNum;
    @Column(name = "main_author")
    private String mainAuthor;
    @Column(name = "imgurl")
    private String imgurl;

    private Score score;

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getItemname() {return itemname;}

    public void setItemname(String itemname) {this.itemname = itemname;}

    public Timestamp getPubTime() {return pubTime;}

    public void setPubTime(Timestamp pubTime) {this.pubTime = pubTime;}

    public int getChapterNum() {return chapterNum;}

    public void setChapterNum(int chapterNum) {this.chapterNum = chapterNum;}

    public String getMainAuthor() {return mainAuthor;}

    public void setMainAuthor(String mainAuthor) {this.mainAuthor = mainAuthor;}

    public String getImgurl() {return imgurl;}

    public void setImgurl(String imgurl) {this.imgurl = imgurl;}


}
