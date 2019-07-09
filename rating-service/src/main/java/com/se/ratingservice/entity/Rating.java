package com.se.ratingservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "Rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "item_id", nullable = false)
    private Long itemId;
    @Column(name = "avg_score")
    private float avgScore;
    @Column(name = "`rank`")
    private Integer rank;
    @Column(name = "tot_score_num")
    private Integer totScoreNum;
    @Column(name = "type")
    private Integer type;
    @Column(name = "score_1")
    private Integer score1;
    @Column(name = "score_2")
    private Integer score2;
    @Column(name = "score_3")
    private Integer score3;
    @Column(name = "score_4")
    private Integer score4;
    @Column(name = "score_5")
    private Integer score5;
    @Column(name = "score_6")
    private Integer score6;
    @Column(name = "score_7")
    private Integer score7;
    @Column(name = "score_8")
    private Integer score8;
    @Column(name = "score_9")
    private Integer score9;
    @Column(name = "score_10")
    private Integer score10;

    public Long getId() {
        return id;
    }


    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public float getAvgScore() {
        return avgScore;
    }

    public void setAvgScore(float avgScore) {
        this.avgScore = avgScore;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Integer getTotScoreNum() {
        return totScoreNum;
    }

    public void setTotScoreNum(Integer totScoreNum) {
        this.totScoreNum = totScoreNum;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getScore1() {
        return score1;
    }

    public void setScore1(Integer score1) {
        this.score1 = score1;
    }

    public Integer getScore2() {
        return score2;
    }

    public void setScore2(Integer score2) {
        this.score2 = score2;
    }

    public Integer getScore3() {
        return score3;
    }

    public void setScore3(Integer score3) {
        this.score3 = score3;
    }

    public Integer getScore4() {
        return score4;
    }

    public void setScore4(Integer score4) {
        this.score4 = score4;
    }

    public Integer getScore5() {
        return score5;
    }

    public void setScore5(Integer score5) {
        this.score5 = score5;
    }

    public Integer getScore6() {
        return score6;
    }

    public void setScore6(Integer score6) {
        this.score6 = score6;
    }

    public Integer getScore7() {
        return score7;
    }

    public void setScore7(Integer score7) {
        this.score7 = score7;
    }

    public Integer getScore8() {
        return score8;
    }

    public void setScore8(Integer score8) {
        this.score8 = score8;
    }

    public Integer getScore9() {
        return score9;
    }

    public void setScore9(Integer score9) {
        this.score9 = score9;
    }

    public Integer getScore10() {
        return score10;
    }

    public void setScore10(Integer score10) {
        this.score10 = score10;
    }


}
