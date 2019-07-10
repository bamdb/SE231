from locust import HttpLocust, TaskSet, task
from random import choice


class WebTasks(TaskSet):

    @task(20)
    def user_test(self):
        self.client.get("/user/all")
        self.client.get("/user/id/1")

    @task(100)
    def item_task(self):
        item = self.client.get("/item/all").json()
        one_item = choice(item)
        item_id = one_item["id"]
        self.client.get("/item/id/{}".format(item_id))
    """
    @task(20)
    def image_task(self):
        self.client.post("/image/insert/1")
        self.client.put("/image/update/1")
        self.client.get("/image/1")
        self.client.delete("/image/delete/1")
        
    @task(10)
    def light_task(self):
        activity = self.get("/activity/all")
        activity_item = choice(activity)
        item_id = activity_item["id"]
        self.client.get("/activity/id/{}".format(item_id))
    """


class WebClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0


class MobileClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0
