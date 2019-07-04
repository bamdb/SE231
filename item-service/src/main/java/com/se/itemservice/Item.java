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
    private Timestamp pub_time;
    @Column(name = "chapter_num")
    private int chapter_num;
    @Column(name = "main_author")
    private String main_author;
    @Column(name = "imgurl")
    private String imgurl;

    public 
}
