# Load Tests

These tests simulate actual end user usage of Bamdb website. They are used to validate the overall functionality and can also be used to put simulated load on the system. The tests are written using [locust.io](http://locust.io)

### Parameters
* `[delay]` - The wait time before load test starts. (Optional: Default is 1)
* `[host]` - The hostname (and port if applicable) where the application is exposed. (Required)
* `[number of clients]` - The nuber of concurrent end users to simulate. (Optional: Default is 2)
* `[hatch rate]` - The number of clients start up per second. (Optional: Default is 10)
* `[run time]` - Load test run time. (Optional: Default is 10s)

## Running locally

### Requirements 
* locust `pip install locustio`

`(sudo )./runLocust.sh -d [delay] -h [host] -c [number of clients] -r [number of requests] -t [run time]`

### Output
* you will see output in file './traces/test[number of clients]_requests.csv'


# Evaluation with plot

## Running locally

* Python Package Requirements
  * pandas
  * matplotlib
  * os
  
`python evaluation.py`

### Output
* you will see output in file './output.png'
