from locust import HttpLocust, TaskSet, task
from random import choice


class WebTasks(TaskSet):

    @task
    def login_task(self):
        data = {'grant_type': 'password', 'client_secret': '', 'username': 'test', 'password': 'test'}
        header = {'Content-Type': 'application/x-www-form-urlencoded'}
        auth = self.client.post("/auth/oauth/token", headers=header, data=data)
        token = auth.json()["access_token"]
        header_auth = {'Authorization': 'Bearer '+token}


class WebClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0


class MobileClient(HttpLocust):
    task_set = WebTasks
    min_wait = 0
    max_wait = 0

