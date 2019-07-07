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
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "item_id")
    private Long itemId;

    public Long getId() {
        return id;
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

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
