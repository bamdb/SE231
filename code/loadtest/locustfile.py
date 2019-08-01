from locust import HttpLocust, TaskSet, task
from random import choice
import json


class WebTasks(TaskSet):

    @task(30)
    def item_task(self):
        item_id = choice(range(20000, 200000))
        item = self.client.get("/item/id/{}".format(item_id))
        if item is not None:
            self.client.get("/comment/itemid/{}".format(item_id))

    @task(10)
    def activity_task(self):
        activity = self.client.get("/activity/all")
        if activity.content is not None:
            one_activity = choice(json.loads(activity.content))
            activity_id = one_activity["id"]
            self.client.get("/activity/id/{}".format(activity_id))

    @task(10)
    def topic_task(self):
        topic = self.client.get("/topic/all")
        # if topic.content is not None:
        #     one_topic = choice(json.loads(topic.content))
        #     topic_id = one_topic["id"]
        #     self.client.get("/topic/id/{}".format(topic_id))
            
    @task(30)
    def rating_task(self):
        rating_id = choice(range(1, 200000))
        self.client.get("/rating/id/{}".format(rating_id))

    @task(20)
    def user_task(self):
        for i in range(1, 100):
            self.client.get("/auth/id/{}".format(i))
            # if user.content is not None:
            #     one_user = json.loads(user.content)
            #     print("\n\n\n\n\n\n\n\n"+user.content)
            #     if "id" in one_user:
            #         user_id = one_user["id"]
            #         self.client.get("/activity/userid/{}".format(user_id))
            #         self.client.get("/comment/userid/{}".format(user_id))


class WebClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0


class MobileClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0

