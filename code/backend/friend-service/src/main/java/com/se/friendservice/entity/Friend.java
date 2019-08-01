package com.se.friendservice.entity;

import org.hibernate.annotations.Check;
import org.springframework.stereotype.Indexed;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "friend",
        uniqueConstraints = {@UniqueConstraint(columnNames={"user_id1", "user_id2"})},
        indexes ={@Index(columnList = "user_id1"), @Index(columnList = "user_id2")}
)
//@Check(constraints = "user_id1 < user_id2")
public class Friend {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne(cascade = CascadeType.ALL, targetEntity = User.class)
//    @JoinColumn(name = "user_id1", nullable = false, referencedColumnName = "id")
    @Column(nullable = false, name = "user_id1")
    private Long userId1;

//    @ManyToOne(cascade = CascadeType.ALL, targetEntity = User.class)
//    @JoinColumn(name = "user_id2", nullable = false, referencedColumnName = "id")
    @Column(nullable = false, name = "user_id2")
    private Long userId2;

    private Integer status;
    public Long getUserId1() {
        return userId1;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setUserId1(Long userId1) {
        this.userId1 = userId1;
    }

    public Long getUserId2() {
        return userId2;
    }

    public void setUserId2(Long userId2) {
        this.userId2 = userId2;
    }

    public Friend() {
    }
    public Friend(Long userId1, Long userId2, Integer status) {
        setUserId1(userId1);
        setUserId2(userId2);
        setStatus(status);
    }
    public Friend(Long userId1, Long userId2) {
        setUserId1(userId1);
        setUserId2(userId2);
    }

    public Friend(Long id, Long userId1, Long userId2) {
        setUserId1(userId1);
        setId(id);
        setUserId2(userId2);
    }

}
