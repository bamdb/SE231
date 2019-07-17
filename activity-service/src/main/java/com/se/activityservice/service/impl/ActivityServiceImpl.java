package com.se.activityservice.service.impl;

import com.se.activityservice.client.ItemClient;
import com.se.activityservice.client.UserClient;
import com.se.activityservice.dao.MongoDao;
import com.se.activityservice.dao.ReadDao;
import com.se.activityservice.dao.WriteDao;
import com.se.activityservice.entity.*;
import com.se.activityservice.repository.ActivityRepository;
import com.se.activityservice.repository.ProgressRepository;
import com.se.activityservice.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Resource(name="mongoDaoImpl")
    private MongoDao mongoDao;

    @Resource(name="readDaoImpl")
    private ReadDao readDao;

    @Resource(name="writeDaoImpl")
    private WriteDao writeDao;

    @Autowired
    UserClient userClient;

    @Autowired
    ItemClient itemClient;

    public Progress selectProgress(Long userId, Long itemId) {
        return mongoDao.findByItemIdAndUserId(userId, itemId);
    }

    public Progress updateProgress(Progress progress) {
        Progress progress1 = mongoDao.findByItemIdAndUserId(progress.getItemId(), progress.getUserId());
        if (progress1 != null) {
            progress.setId(progress1.getId());
        }
        return mongoDao.save(progress);
    }

    public Activity postActivity(Activity activity) {
        // check if user exists in User table
        if (activity.getUserId() == null || userClient.getUserById(activity.getUserId()) == null) {
            return null;
        }
        // check if  item exists in Item table
        if (activity.getItemId() == null || itemClient.getItemById(activity.getItemId()) == null) {
            return null;
        }
        return writeDao.save(activity);
    }

    public Iterable<Activity> selectAll() {
        return readDao.findAll();
    }

    public Activity selectById(Long id) {
        return readDao.findById(id);
    }

    public List<ActivityItemOut> selectByUserId(Long id) {
        Iterable<Activity> activityIterable = readDao.findAllByUserId(id);
        if (!activityIterable.iterator().hasNext()) {
            return null;
        }
        // user has been deleted in user-service, then corresponding activity should be delete
        if (userClient.getUserById(id) == null) {
            deleteActivityByUserId(id);
            return null;
        }
        Iterator<Activity> activityIterator = activityIterable.iterator();
        List<ActivityItemOut> activityItemOuts = new ArrayList<>();
        while (activityIterator.hasNext()) {
            Activity activity = activityIterator.next();
            ActivityItemOut activityItemOut = new ActivityItemOut();
            activityItemOut.setActivity(activity);
            Item item = itemClient.getItemById(activity.getItemId());
            activityItemOut.setItem(item);
            activityItemOuts.add(activityItemOut);
        }
        return activityItemOuts;
    }

    public Iterable<Activity> selectByItemId(Long id) {
        Iterable<Activity> activityIterable = readDao.findAllByItemId(id);
        if (!activityIterable.iterator().hasNext()) {
            return null;
        }
        // item has been deleted in item-service, then corresponding activity should be delete
        if (itemClient.getItemById(id) == null) {
            deleteActivityByItemId(id);
            return null;
        }
        return readDao.findAllByItemId(id);
    }

    public ActivityUserOut selectByUserIdAndItemId(Long userId, Long itemId) {
        Activity activity = readDao.findActivityByUserIdAndItemId(userId, itemId);

        User user = userClient.getUserById(userId);
        ActivityUserOut activityUserOut = new ActivityUserOut();
        activityUserOut.setActivity(activity);
        activityUserOut.setUser(user);
        return activityUserOut;
    }

    public ResponseEntity<?> deleteActivityById(Long id) {
        writeDao.deleteById(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }

    public ResponseEntity<?> deleteActivityByUserId(Long id) {
        writeDao.deleteAllByUserId(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }

    public ResponseEntity<?> deleteActivityByItemId(Long id) {
        writeDao.deleteAllByItemId(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }
}
