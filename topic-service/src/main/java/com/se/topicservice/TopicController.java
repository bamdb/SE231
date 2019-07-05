package com.se.topicservice;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class TopicController {
    @Resource(name="topicServiceImpl")
    private TopicService topicService;

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Topic> getAllTopics() {
        return topicService.selectAll();
    }

    @GetMapping(value="/id/{id}", produces="application/json")
    public Topic getTopicById(@PathVariable("id") Long topicId) {
        return topicService.selectById(topicId);
    }

    @PutMapping(value="/update", produces="application/json")
    public Topic updateTopic(@RequestBody Topic topic) {
        return topicService.updateTopic(topic);
    }

    @DeleteMapping(value="/delete/id/{id}")
    public void deleteTopicById(
            @PathVariable("id") Long id) {
        topicService.deleteTopicById(id);
    }
}
