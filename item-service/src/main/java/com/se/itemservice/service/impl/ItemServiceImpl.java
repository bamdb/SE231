package com.se.itemservice.service.impl;

import com.se.itemservice.dao.*;
import com.se.itemservice.dao.Impl.ItemReadDaoImpl;
import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.entity.Tag;
import com.se.itemservice.entity.graph.Edge;
import com.se.itemservice.entity.graph.Node;
import com.se.itemservice.entity.graph.Root;
import com.se.itemservice.repository.ItemRepository;
import com.se.itemservice.repository.ItemtagRepository;
import com.se.itemservice.repository.RelationRepository;
import com.se.itemservice.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    @Resource(name="itemReadDaoImpl")
    ItemReadDao itemReadDao;
    @Resource(name="itemWriteDaoImpl")
    ItemWriteDao itemWriteDao;
    @Resource(name="relationReadDaoImpl")
    RelationReadDao relationReadDao;
    @Resource(name="relationWriteDaoImpl")
    RelationWriteDao relationWriteDao;    
    @Resource(name="mongoDaoImpl")
    MongoDao mongoDao;

    public Item postItem(Item item) {
        return itemWriteDao.save(item);
    }

    @Override
    public ResponseEntity<?> deleteItemTag(Long itemId, Long userId, List<String> tagList) {
        Itemtag itemtag = mongoDao.findByItemId(itemId);
        List<Tag> tags = itemtag.getTags();
        List<Tag> tagDeleted = new ArrayList<>();
        for (String tagname : tagList) {
            for (Tag tag : tags) {
                // tagname exists in item tag list
                if (tag.getTagname().equals(tagname)) {
                    List<Long> userList = tag.getUserList();
                    // user makes no such tag
                    if (!userList.contains(userId)) {
                        return ResponseEntity.ok().body("User has no such tag!");
                    }
                    userList.remove(userId);
                    // when remove all user in a tag, the tag shoud be deleted
                    if (userList.size() == 0) {
                        tagDeleted.add(tag);
                    }else {
                        tag.setUserList(userList);
                    }
                }
            }
        }
        for (Tag tag : tagDeleted) {
            tags.remove(tag);
        }
        itemtag.setTags(tags);
        mongoDao.save(itemtag);
        return ResponseEntity.ok().body("Delete tag successfully");
    }

    public ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId) {
        relationWriteDao.deleteRelationBySourceAndTarget(itemId, relatedItemId);
        relationWriteDao.deleteRelationBySourceAndTarget(relatedItemId, itemId);
        return ResponseEntity.ok().body("delete relation successfully!");
    }

    public void postItemRelation(Long source, Long target, String relateType) {
        if (itemReadDao.findById(source) == null
                || itemReadDao.findById(target) == null) {
            return;
        }
        Relation relation = new Relation();
        relation.setSource(source);
        relation.setTarget(target);
        relation.setRelateType(relateType);
        relationWriteDao.save(relation);
    }

    public Itemtag findItemtag(Long itemId) {
        return mongoDao.findByItemId(itemId);
    }


    public List<String> findUsertag(Long itemId, Long userId) {
        Itemtag itemtag = mongoDao.findByItemIdAndUserId(itemId, userId);
        List<String> tagString = new ArrayList<>();
        List<Tag> tagList = itemtag.getTags();
        for (Tag tag : tagList) {
            if (tag.getUserList().contains(userId)) {
                tagString.add(tag.getTagname());
            }
        }
        return tagString;
    }

    public Root findItemGraph(Long itemId) {
        Item item = itemReadDao.findById(itemId);
        if (item == null) {
            return null;
        }

        Root root = new Root();
        Long nodeId = 0L;
        Long nextNodeId = 1L;
        List<Edge> edges = new ArrayList<>();
        List<Node> nodes = new ArrayList<>();
        Node firstNode = new Node(nodeId, item.getImgurl(), item.getItemname(), item.getItemname(), item.getId());
        nodes.add(firstNode);

        do {
            final Long currNodeId = nodeId;
            Node node = nodes.stream().filter(node1 -> node1.getId().equals(currNodeId)).collect(Collectors.toList()).get(0);
            Iterable<Relation> relationIterable = relationReadDao.findAllBySource(node.getSubject_id());
            for (Relation relation : relationIterable) {
                // find if target item exists in node
                String edgeId = relation.getSource().toString() + "-" + relation.getTarget().toString();
                List<Node> nodeList = nodes.stream().filter(node1 -> node1.getSubject_id().equals(relation.getTarget()))
                        .collect(Collectors.toList());

                // No item found, continue to next relation
                Item targetItem = itemReadDao.findById(relation.getTarget());
                if (targetItem == null) {
                    continue;
                }

                // a new node should be added to nodes?
                if (nodeList.size() == 0) {
                    nodes.add(new Node(nextNodeId, targetItem.getImgurl(), targetItem.getItemname(),
                            targetItem.getItemname(), targetItem.getId()));
                    edges.add(new Edge(edgeId, relation.getRelateType(), false, currNodeId, nextNodeId));
                    nextNodeId++;
                } else {
                    Node newNode = nodeList.get(0);
                    edges.add(new Edge(edgeId, relation.getRelateType(), false, currNodeId, newNode.getId()));
                }
            }
            nodeId++;
        } while (nodeId < nodes.size());
        root.setEdges(edges);
        root.setNodes(nodes);
        return root;
    }

    public Itemtag postItemTag(Long itemId, Long userId, List<String> tagList) {
        Itemtag itemtag = mongoDao.findByItemId(itemId);
        Item item = itemReadDao.findById(itemId);

        if (item == null) {
            return null;
        }

        if (itemtag == null) {
            itemtag = new Itemtag();
            itemtag.setTags(new ArrayList<>());
            itemtag.setItemId(item.getId());
        }

        List<Tag> tags = itemtag.getTags();
        for (String tagname : tagList) {
            boolean tagExist = false;
            for (Tag tag : tags) {
                // tagname exists, push userId to userList
                if (tag.getTagname().equals(tagname)) {
                    tagExist = true;
                    List<Long> userList = tag.getUserList();
                    // user has added same tag before, do nothing
                    if (!userList.contains(userId)) {
                        userList.add(userId);
                    }
                    tag.setUserList(userList);
                }
            }
            // tagname not exists, create new tag and push it to itemtag's tag list
            if (!tagExist) {
                Tag newTag = new Tag();
                newTag.setTagname(tagname);
                List<Long> userList = new ArrayList<>();
                userList.add(userId);
                newTag.setUserList(userList);
                tags.add(newTag);
            }
        }
        itemtag.setTags(tags);
        return mongoDao.save(itemtag);
    }

    public Iterable<Item> selectAll() {return itemReadDao.findAll();}

    public Item findItemById(Long id) {
        Item item = itemReadDao.findById(id);
        if (item != null) {
            item.setRelations(new ArrayList<>());
            Iterable<Relation> relationIterable = relationReadDao.findAllBySource(item.getId());
            item.setRelations(relationIterable);
        }
        return item;
    }

    public ResponseEntity<?> deleteItemById(Long id) {
        itemWriteDao.deleteById(id);
        relationWriteDao.deleteAllBySource(id);
        relationWriteDao.deleteAllByTarget(id);
        return ResponseEntity.ok().body("delete item successfully!");
    }

    public Item updateItem(Item item) {
        if (itemReadDao.existsById(item.getId())) {
            return itemWriteDao.save(item);
        }
        else return null;
    }
}