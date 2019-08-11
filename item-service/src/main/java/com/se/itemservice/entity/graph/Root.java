package com.se.itemservice.entity.graph;

import java.util.List;

public class Root {
    private List<Edge> edges;
    private List<Node> nodes;

    public List<Edge> getEdges() {
        return edges;
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }
}
