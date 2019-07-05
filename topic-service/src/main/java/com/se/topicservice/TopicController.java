package com.se.topicservice;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class TopicController {
    @Resource(name="topicServiceImpl")
    private TopicService topicService;

    @PostMapping(value="/add", produces="application/json")
    public Topic postTopic(@RequestBody Topic topic) {
        return topicService.postTopic(topic);
    }

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

    @DeleteMapping(value="/delete/id/{topicId}")
    public void deleteTopicById(
            @PathVariable("topicId") Long topicId) {
        topicService.deleteTopicById(topicId);
    }

}
