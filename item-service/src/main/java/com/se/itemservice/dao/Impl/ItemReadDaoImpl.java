package com.se.itemservice.dao.Impl;

import com.se.activityservice.config.ds.DataSource;
import com.se.activityservice.dao.ReadDao;
import com.se.activityservice.entity.Activity;
import com.se.activityservice.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ItemReadDaoImpl implements ReadDao {

    private final ItemRepository itemRepository;
    private final RelationRepository relationRepository;
    private final ItemtagRepository itemtagRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, RelationRepository relationRepository,
                           ItemtagRepository itemtagRepository) {
        this.itemRepository = itemRepository;
        this.relationRepository = relationRepository;
        this.itemtagRepository = itemtagRepository;
    }

    private final ActivityRepository activityRepository;

    @Autowired
    public ItemReadDaoImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    @DataSource("slave")
    public Iterable<Activity> findAll() {
        return activityRepository.findAll();
    }

    @Override
    @DataSource("slave")
    public Activity findById(Long activityId) {
        return activityRepository.findById(activityId).orElse(null);
    }

    @Override
    @DataSource("slave")
    public Iterable<Activity> findAllByUserId(Long userId) {
        return activityRepository.findAllByUserId(userId);
    }

    @Override
    @DataSource("slave")
    public Iterable<Activity> findAllByItemId(Long itemId) {
        return activityRepository.findAllByItemId(itemId);
    }

    @Override
    @DataSource("slave")
    public Activity findActivityByUserIdAndItemId(Long userId, Long itemId) {
        return activityRepository.findCollectByUserIdAndItemId(userId, itemId).orElse(null);
    }
}
