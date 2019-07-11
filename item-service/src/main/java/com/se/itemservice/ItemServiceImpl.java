package com.se.itemservice;

import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.repository.ItemRepository;
import com.se.itemservice.repository.RelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
public class ItemServiceImpl implements ItemService{
    private final ItemRepository itemRepository;
    private final RelationRepository relationRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, RelationRepository relationRepository) {
        this.itemRepository = itemRepository;
        this.relationRepository = relationRepository;
    }

    public Item postItem(Item item) {
        return itemRepository.save(item);
    }

    public ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId) {
        Iterable<Relation> relationIterable1 = relationRepository.findAllByItemId1(itemId);
        Iterator<Relation> relationIterator1 = relationIterable1.iterator();
        while (relationIterator1.hasNext()) {
            Relation relation = relationIterator1.next();
            if (relation.getItemId2() == relatedItemId) {
                relationRepository.delete(relation);
            }
        }
        Iterable<Relation> relationIterable2 = relationRepository.findAllByItemId2(itemId);
        Iterator<Relation> relationIterator2 = relationIterable1.iterator();
        while (relationIterator2.hasNext()) {
            Relation relation = relationIterator2.next();
            if (relation.getItemId1() == relatedItemId) {
                relationRepository.delete(relation);
            }
        }
        return null;
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
        return itemRepository.findById(id).orElse(null);
    }

    public ResponseEntity<?> deleteItemById(Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public Item updateItem(Item item) {
        if (itemRepository.existsById(item.getId())) {
            return itemRepository.save(item);
        }
        else return null;
    }
}