package com.se.itemservice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Score")
public class Score {
    @Id
    @Column(name = "item_id")
    private Long itemId;
    @Column(name = "avg_grade")
    private float avgGrade;
    @Column(name = "rank")
    private int rank;

    public Long getItemId() {return itemId;}

    public void setItemId(Long itemId) {this.itemId = itemId;}

    public float getAvgGrade() {return avgGrade;}

    public void setAvgGrade(float avgGrade) {this.avgGrade = avgGrade;}

    public int getRank() {return rank;}

    public void setRank(int rank) {this.rank = rank;}
}
