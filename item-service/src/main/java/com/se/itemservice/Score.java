package com.se.itemservice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "score")
public class Score {
    @Id
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "rank")
    private Integer rank;
    @Column(name = "avg_grade")
    private float avgGrade;

    public Long getUserId() {return userId;}

    public Integer getRank() {return rank;}

    public float getAvgGrade() {return avgGrade;}

    public void setUserId(Long userId) { this.userId = userId;}

    public void setRank(Integer rank) {this.rank = rank;}

    public void setAvgGrade(float avgGrade) {this.avgGrade = avgGrade;}
}
