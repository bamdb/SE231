# 2019-7-1
* starting writing component
  * wang zulai:complete component navigation, collect box, collect form
  * shen ruien:complete component item,scheduletable,userinfo,tag
  * huang yuyang:learning the usage of material ui
* starting building CI/CD
  * yu yajie:Initial construction of CI
---
# 2019-7-2
* continuing writing component
  * wang zulai:complete component commentlist, browserlist
  * shen ruien:upgrade component listitem,collectform
  * hunag yuyang:compelete component login,register
* building CI/CD and the architectrue
  * yu yajie:building CI/CD
---
# 2019-7-3
* wangzulai:
  * complete component activitylist, discuss and reply form, relatedlist
  * design CDM, PDM and generate DDL for mysql database
  * design data structure for data stored in mongodb
* shenruien:
  * complete component progressmanage,search upgrade component scheduletable
  * design the database
  * start installing the environment of react-native
* yuyajie:
  * continuing ci/cd
  * building microservice
* huangyuyang:
  * Finish TopItemList & TopicList Start front-end combination Learn material-ui design
---
# 2019-7-4
* wangzulai:
  * working on user service
* shenruien:
  * start writing web pages
  * basic website has been built
* yuyajie:
  * user-service
  * test
* huangyuyang:
  * continue to write web-page
---
 # 2019-7-5
* wangzulai:
  * complete crud func of topic, item, activity services
  * complete test cases of topic, item services
* shenruien:
  * finish basic web page
  * build CI for frontend
  * prepare the backend environment
* yuyajie:
  * user, image, comment
  * test
* huangyuyang:
  * Perfect web-frontend
---
# 2019-7-8
* shenruien:
  * deploy frontend
  * connect frontend and backend
  * complete frontend test
* wangzulai:
  * complete crud for item, topic, activity, rating services
  * complete 100% test coverage for item, topic, activity, rating services
  * deploy backend onto server
  * write open-api doc in SwaggerHub, finish item, activity, rating api doc
* yuyajie:  
  * comment, friend, message
  * test
* huangyuyang:
  * upgrade web pages
---
# 2019-7-9
* shenruien:
  * fix bugs in test
  * finishing CD for frontend
  * writing document for the first sprint
* wangzulai:
  * complete topic reply service
  * building CD for backend
* yuyajie:
  * building CD for backend
* huangyuyang:
  * 在现有情况下完成了前端的逻辑部分，且前后端连通，开始写第一次迭代报告
# 2019-7-10
* shenruien:
  * upgrade test
  * write document
  * fix frontend bugs
* yuyajie:
  * 架构文档
  * 负载均衡
* wangzulai: 
  * write docs
  * write locustfile.py for performance test
  * work on auto evaluation script
  * deploy backend on another server
* huangyuyang:
  * realize frontend api
  * write document
# 2019-7-11
* shenruien:
  * continuing writing frontend
  * doing load balance on frontend
* yuyajie:
  * load balancing
  * distrbuted deployment
* wangzulai:
  * complete auto load-test and evaluation plot scripts
  * complete load-test in single-node backend server
* huangyuyang:
  * Ill leave
# 2019-7-12
* shenruien:
  * continuing writing frontend
* yuyajie:
  * performance tuning
  * working on authentication
* huangyuyang:
  * 学习matierial-ui文档并进行页面修改
* wangzulai:
  *  run load test forbackend server
  *  complete item, topic, activity, rating services
  *  write 100% coverage test
# 2019-7-15
* shenruien:
  * beautify the frontpage
  * upgrade the frontend
* wangzulai: 
  * complete tag and progress services
  * configured load balance in three server
* yuyajie: 
  * 继续搞security+oauth2
  * 解决负载均衡的问题
* huangyuyang:
  * 页面美化及整理前后端接口需求
# 2019-7-16
* shenruien:
  * modify homepage
* wangzulai:
  * add more info in service response
  * config mongodb to solve socket exception
* yuyajie:
  * authentication + authorization
* huangyuyang:
  * beautify the frontend
  * redisign the frontend
# 2019-7-17
* shenruien:
  * modify frontendpage
* huangyuyang：
  * beautify the frontend
  * redisign the frontend
* yuyajie:
  * finish security + oauth2
  * modify security test
* wangzulai:
  * fix bug in image upload
  * configure replication in three mysql database server
  * configure read write splitting in backend
# 2019-7-18
* shenruien:
  * modify frotend logic to fit the user auth
* wangzulai:
  * complete dao layer in all services
  * config mongodb sharding in four servers
* huangyuyang:
  * rewrite the component to fit the backend
* yuyajie:
  * dealong with auth problem in micro service deploy
# 2019-7-19
* shenruien:
  * modify frotend logic to fit bakcend
  * test frontend
* yuyajie:
  * api doc
  * unit tests with security, in-memory DB and master-slave DB integrated
  * fine-tune the configuration and allocate authorization
* wangzulai:
  * deploy services
  * work on mongodb sharding in four servers
* huangyuyang:
  * 完成浏览页面ui、私信ui及进度前端接口
# 2019-7-22
* shenruien:
  * fix bugs in frontend
  * modify frotend logic to fit bakcend
* huangyuayng:
  * edit progress and message to fit backend
* wangzulai:  
  * config redis cluster
  * fix CORS bug
  * complete editor function in frontend
* yuayjie:
  * 写文档
  * 细化权限分配
  * 修改单元测试
# 2019-7-23
* shenruien:
  * finishing sprint2
  * finishing basic frontend
* huangyuyang:
  * 学习antd theme，初步构思。 修改前端页面
* wangzulai:
  * work on docker image
* yuyajie:
  * 监控+
# 2019-7-24
* shenruien:
  * build the architecture of android
  * finish navigate and login
* yuyajie:
  * rabbitmq + elk + zipkin + hystrix turbine
* wangzulai:  
  * complete docker image
  * test run image on one node
* huangyuyang:
  * 添加progress/update,并修改部分逻辑，见frontend design 在用户主页面做出走马灯效果 所有界面跳转放在page里
# 2019-7-25
* all:
  * preparing for the exam ≧０≦
  * continueing former work
# 2019-7-26
* shenruien:
  * finishing the android v1.0
* huangyuyang:
  * 修改activitypage逻辑 在前端添加注册验证的部分 配置android的部分
* yuyajie:
  * elk + prometheus + grafana
* wangzulai:
  * config docker swarm
  * work on mail verification
# 2019-7-27
* shenruien:
  * rewrite the editor and add friend
  * deal with data 
* wangzulai:
  * scraping data from bangumi
  * complete QRcode login
* huangyuyang:
  * 现有Alert部分统一样式
  * Registerpage：添加页面用户名，密码，确认密码，邮箱格式检查部分（正则表达式确认，并用Alert组件输出错误）
  * 浏览页面分页逻辑完成
  * register邮箱验证逻辑完成
  * 登录页面扫码部分完成
* yuyajie:
  * elk + filebeat


















