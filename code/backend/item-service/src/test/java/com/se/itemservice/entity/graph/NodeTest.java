package com.se.itemservice.entity.graph;

import org.junit.Test;

public class NodeTest {
    @Test
    public void testItemTag() {
        Node node = new Node();
        node.setId(0L);
        node.setImage("abc");
        node.setName("abc");
        node.setName_cn("abc");
        node.setSubject_id(0L);
    }
}
