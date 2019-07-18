package com.se.itemservice.service.impl;

import com.se.itemservice.dao.*;
import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.entity.Tag;
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

@Service
public class ItemServiceImpl implements ItemService {

    @Resource(name="mongoDaoImpl")
    private MongoDao mongoDao;

    @Resource(name="itemReadDaoImpl")
    private ItemReadDao itemReadDao;

    @Resource(name="itemWriteDaoImpl")
    private ItemWriteDao itemWriteDao;

    @Resource(name="relationReadDaoImpl")
    private RelationReadDao relationReadDao;

    @Resource(name="relationWriteDaoImpl")
    private RelationWriteDao relationWriteDao;


    public Item postItem(Item item) {
        return itemWriteDao.save(item);
    }

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
        relationWriteDao.deleteRelationByItemId1AndItemId2(itemId, relatedItemId);
        relationWriteDao.deleteRelationByItemId1AndItemId2(relatedItemId, itemId);
        return ResponseEntity.ok().body("delete relation successfully!");
    }

    public void postItemRelation(Long priorId, Long subsequentId, boolean relateType) {
        if (itemReadDao.findById(priorId) == null
                || itemReadDao.findById(subsequentId) == null) {
            return;
        }
        Relation relation = new Relation();
        relation.setItemId1(priorId);
        relation.setItemId2(subsequentId);
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

    public void postItemTag(Long itemId, Long userId, List<String> tagList) {
        Itemtag itemtag = mongoDao.findByItemId(itemId);
        Item item = itemReadDao.findById(itemId);

        if (item == null) {
            return;
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
        mongoDao.save(itemtag);
    }

    public Iterable<Item> selectAll() {return itemReadDao.findAll();}

    public Item findItemById(Long id) {
        Item item = itemReadDao.findById(id);
        if (item != null) {
            item.setRelationPrior(new ArrayList<>());
            item.setRelationSubsequent(new ArrayList<>());
            item.setRelationNormal(new ArrayList<>());
            List<Item> itemList3 = item.getRelationNormal();

            Iterable<Relation> relationIterable1 = relationReadDao.findAllByItemId1(item.getId());
            Iterator<Relation> relationIterator1 = relationIterable1.iterator();
            List<Item> itemList1 = item.getRelationSubsequent();
            while (relationIterator1.hasNext()) {
                Relation relation = relationIterator1.next();
                Item item1 = itemReadDao.findById(relation.getItemId2());
                if (relation.isRelateType()) {
                    itemList1.add(item1);
                } else {
                    itemList3.add(item1);
                }
            }

            Iterable<Relation> relationIterable2 = relationReadDao.findAllByItemId2(item.getId());
            Iterator<Relation> relationIterator2 = relationIterable2.iterator();
            List<Item> itemList2 = item.getRelationPrior();
            while (relationIterator2.hasNext()) {
                Relation relation = relationIterator2.next();
                Item item1 = itemReadDao.findById(relation.getItemId1());
                if (relation.isRelateType()) {
                    itemList2.add(item1);
                } else {
                    itemList3.add(item1);
                }
            }

            item.setRelationPrior(itemList1);
            item.setRelationSubsequent(itemList2);
            item.setRelationNormal(itemList3);
        }
        return item;
    }

    public ResponseEntity<?> deleteItemById(Long id) {
        itemWriteDao.deleteById(id);
        relationWriteDao.deleteAllByItemId1(id);
        relationWriteDao.deleteAllByItemId2(id);
        return ResponseEntity.ok().body("delete item successfully!");
    }

    public Item updateItem(Item item) {
        if (itemReadDao.existsById(item.getId())) {
            return itemWriteDao.save(item);
        }
        else return null;
    }
}