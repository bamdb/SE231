package com.se.itemservice;

import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.repository.ItemRepository;
import com.se.itemservice.repository.RelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    private final ItemRepository itemRepository;
    private final RelationRepository relationRepository;

    @Resource(name="itemServiceImpl")
    ItemService itemService;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, RelationRepository relationRepository) {
        this.itemRepository = itemRepository;
        this.relationRepository = relationRepository;
    }

    public Item postItem(Item item) {
        return itemRepository.save(item);
    }

    public ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId) {
        relationRepository.deleteRelationByItemId1AndItemId2(itemId, relatedItemId);
        relationRepository.deleteRelationByItemId1AndItemId2(relatedItemId, itemId);
//        Iterable<Relation> relationIterable1 = relationRepository.findAllByItemId1(itemId);
//        Iterator<Relation> relationIterator1 = relationIterable1.iterator();
//        while (relationIterator1.hasNext()) {
//            Relation relation = relationIterator1.next();
//            if (relation.getItemId2() == relatedItemId) {
//                relationRepository.delete(relation);
//            }
//        }
//        Iterable<Relation> relationIterable2 = relationRepository.findAllByItemId2(itemId);
//        Iterator<Relation> relationIterator2 = relationIterable1.iterator();
//        while (relationIterator2.hasNext()) {
//            Relation relation = relationIterator2.next();
//            if (relation.getItemId1() == relatedItemId) {
//                relationRepository.delete(relation);
//            }
//        }
        return ResponseEntity.ok().body("delete relation successfully!");
    }

    public void postItemRelation(Long priorId, Long subsequentId, boolean relateType) {
        Relation relation = new Relation();
        relation.setItemId1(priorId);
        relation.setItemId2(subsequentId);
        relation.setRelateType(relateType);
        relationRepository.save(relation);
    }

    public Iterable<Item> selectAll() {return itemRepository.findAll();}

    public Item findItemById(Long id) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item != null) {
            item.setRelationPrior(new ArrayList<>());
            item.setRelationSubsequent(new ArrayList<>());
            item.setRelationNormal(new ArrayList<>());
            List<Item> itemList3 = item.getRelationNormal();

            Iterable<Relation> relationIterable1 = relationRepository.findAllByItemId1(item.getId());
            Iterator<Relation> relationIterator1 = relationIterable1.iterator();
            List<Item> itemList1 = item.getRelationSubsequent();
            while (relationIterator1.hasNext()) {
                Relation relation = relationIterator1.next();
                Item item1 = itemRepository.findById(relation.getItemId2()).orElse(null);
                if (item1 != null) {
                    if (relation.isRelateType()) {
                        itemList1.add(item1);
                    } else {
                        itemList3.add(item1);
                    }
                }
            }

            Iterable<Relation> relationIterable2 = relationRepository.findAllByItemId2(item.getId());
            Iterator<Relation> relationIterator2 = relationIterable2.iterator();
            List<Item> itemList2 = item.getRelationPrior();
            while (relationIterator2.hasNext()) {
                Relation relation = relationIterator2.next();
                Item item1 = itemRepository.findById(relation.getItemId1()).orElse(null);
                if (item1 != null) {
                    if (relation.isRelateType()) {
                        itemList2.add(item1);
                    } else {
                        itemList3.add(item1);
                    }
                }
            }

            item.setRelationPrior(itemList1);
            item.setRelationSubsequent(itemList2);
            item.setRelationNormal(itemList3);
        }
        return item;
    }

    public ResponseEntity<?> deleteItemById(Long id) {
        itemRepository.deleteById(id);
        relationRepository.deleteAllByItemId1(id);
        relationRepository.deleteAllByItemId2(id);
        return ResponseEntity.ok().body("delete item successfully!");
    }

    public Item updateItem(Item item) {
        if (itemRepository.existsById(item.getId())) {
            return itemRepository.save(item);
        }
        else return null;
    }
}