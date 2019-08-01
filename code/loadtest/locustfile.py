from locust import HttpLocust, TaskSet, task
from random import choice


class WebTasks(TaskSet):

    @task(30)
    def item_task(self):
        item = self.client.get("/item/all")
        if item is not None:
            one_item = choice(item.json())
            item_id = one_item["id"]
            self.client.get("/item/id/{}".format(item_id))
            self.client.get("/rating/itemid/{}".format(item_id))
            self.client.get("/activity/itemid/{}".format(item_id))
            self.client.get("/comment/itemid/{}".format(item_id))

    @task(10)
    def activity_task(self):
        activity = self.client.get("/activity/all")
        if activity is not None:
            one_activity = choice(activity.json())
            activity_id = one_activity["id"]
            self.client.get("/activity/id/{}".format(activity_id))

    @task(10)
    def topic_task(self):
        topic = self.client.get("/topic/all")
        if topic is not None:
            one_topic = choice(topic.json())
            topic_id = one_topic["id"]
            self.client.get("/topic/id/{}".format(topic_id))
            
    @task(30)
    def rating_task(self):
        rating = self.client.get("/rating/all")
        if rating is not None:
            one_rating = choice(rating.json())
            rating_id = one_rating["id"]
            self.client.get("/rating/id/{}".format(rating_id))
            
    @task(20)
    def user_task(self):
        for i in range(1, 100):
            user = self.client.get("/auth/id/{}".format(i))
            if user is not None:
                user_id = choice(user.json())
                self.client.get("/activity/userid/{}".format(user_id))
                self.client.get("/comment/userid/{}".format(user_id))


class WebClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0


class MobileClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0
