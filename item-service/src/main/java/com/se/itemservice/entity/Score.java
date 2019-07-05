package com.se.itemservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "Score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "`rank`")
    private Integer rank;
    @Column(name = "avg_grade")
    private float avgGrade;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "score")
    private Item item;

    public Long getId() {return id;}

    public Integer getRank() {return rank;}

    public float getAvgGrade() {return avgGrade;}

    public void setId(Long id) { this.id = id;}

    public void setRank(Integer rank) {this.rank = rank;}

    public void setAvgGrade(float avgGrade) {this.avgGrade = avgGrade;}
}
