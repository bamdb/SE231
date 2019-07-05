package com.se.activityservice.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "act_time")
    private Timestamp actTime;
    @Column(name = "act_type")
    private Integer actType;

    private User user;

    private Item item;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setActTime(Timestamp actTime) {
        this.actTime = actTime;
    }

    public void setActType(Integer actType) {
        this.actType = actType;
    }

    public Integer getActType() {
        return actType;
    }

    public Timestamp getActTime() {
        return actTime;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

}
