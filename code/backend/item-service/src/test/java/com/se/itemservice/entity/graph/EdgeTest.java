package com.se.itemservice.entity.graph;

import org.junit.Test;

public class EdgeTest {
    @Test
    public void testItemTag() {
        Edge edge = new Edge();
        edge.setId("abc");
        edge.setRelation("abc");
        edge.setRemoved(false);
        edge.setSource(0L);
        edge.setTarget(1L);
    }
}
