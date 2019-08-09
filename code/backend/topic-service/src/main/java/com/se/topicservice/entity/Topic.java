package com.se.topicservice.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Topic")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="user_id", nullable=false)
    private Long userId;
    @Column(name="title", nullable=false)
    private String title;
    @Column(name="pub_time", nullable=false)
    private Timestamp pubTime;

    public Long getId() { return id;}

    public Long getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getPubTime() {
        return pubTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPubTime(Timestamp pubTime) {
        this.pubTime = pubTime;
    }

}
