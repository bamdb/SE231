
[![Build Status](https://travis-ci.org/bamdb/SE231.svg?branch=master)](https://travis-ci.org/bamdb/SE231)
[![codecov.io](https://codecov.io/github/bamdb/SE231/coverage.svg?branch=master)](https://codecov.io/github/bamdb/SE231?branch=master)
[![codebeat badge](https://codebeat.co/badges/bcdc599b-3ef2-471a-843d-784fd0de2e48)](https://codebeat.co/projects/github-com-bamdb-se231-master)
![language](https://img.shields.io/badge/Language-Java-orange.svg)
![license](https://img.shields.io/badge/License-GPL--3.0-blue.svg)

# SE231

code for summer project

# 成员信息

* isadlb 于亚杰
* pleiadesian 王祖来
* scarletfantasy 沈瑞恩
* YuyangHuang 黄雨瑒


# 暑期项目

* 项目名：bamdb = book and movie database

### 简介


* 通过作品的评价进行作品的个性化推荐
* 分析所有用户日常观看作品和评价，定量的对作品价值进行分析。
* 当学生手头同时在观看/阅读多个作品的时候，便于学生进行学习进度、观看进度的管理，以防遗忘。

### 访问
<http://www.bamdb.cn>


### 集群信息
* ubuntularge: 4 vCPU | 8 GiB | Ubuntu 18.04
* bamdb: 4 vCPU | 8 GiB | Ubuntu 18.04
* bamdb1:  4 vCPU | 8 GiB | Ubuntu 18.04
* bamdb2:  4 vCPU | 8 GiB | Ubuntu 18.04
* aliyun1:  1 vCPU | 2 GiB | Ubuntu 18.04
* aliyun2:   1 vCPU | 2 GiB | Ubuntu 18.04
* bandwagon:   1 vCPU | 2 GiB | Centos 7


### 技术栈

* frontend: React React-Native
* backend: Spring
* database: Mysql 8.0 | Redis 5.0 | MongoDB 3.6
* OAuth2 | Spring Security
* Mysql 读写分离
    * master: ubuntularge 4 vCPU | 8 GiB
    * slave: aliyun1 1 vCPU | 2 GiB
* MongoDB
    * ubuntularge: 4 vCPU | 8 GiB | Ubuntu 18.04
* Redis集群
    * Store token for OAuth2
    * master
        * bamdb: 4 vCPU | 8 GiB | Ubuntu 18.04
        * bamdb1:  4 vCPU | 8 GiB | Ubuntu 18.04
        * bamdb2:  4 vCPU | 8 GiB | Ubuntu 18.04
    * slave
        * ubuntularge: 4 vCPU | 8 GiB | Ubuntu 18.04
        * aliyun1:  1 vCPU | 2 GiB | Ubuntu 18.04
        * aliyun2:   1 vCPU | 2 GiB | Ubuntu 18.04
* 微服务架构
    * 12 microservices
    * in three servers
        * bamdb: 4 vCPU | 8 GiB | Ubuntu 18.04
        * bamdb1:  4 vCPU | 8 GiB | Ubuntu 18.04
        * bamdb2:  4 vCPU | 8 GiB | Ubuntu 18.04
* Nginx
    * 反向代理
    * 负载均衡
* 监控
* RESTful
    * Open API
        * [openapi.yml](https://app.swaggerhub.com/apis/ba818/open-api/1.0.0 "swaggerhub")
* 性能测试
    * Locust


## 实体

>### 用户
 
* 分为：普通用户、编辑人、系统管理员
* 普通用户权限
	* 收藏条目
	* 更新条目进度
	* 更改条目状态
	* 评分及评论
		* 用户收藏条目时可以对条目添加评分和评论
	* 讨论版块发言
	* 个人主页可以看到收藏，个人的评分排名，个人动态，个人日志，个人链接等
	* 普通用户之间可以加好友
* 编辑人
	* 增删改查条目
	* 可以举报非法编辑
	* 可以查看条目编辑历史
* 系统管理员
	* 禁用用户功能，禁言用户
	* 授予编辑人权限

>### 条目
 
* 分类：电影、课外书、教科书、电视剧、动漫……
* 条目之间可以添加关联，如在第三部作品的条目下可以看到第一部、第二部的链接
	* 进阶：通过图分析判断系列作品。
* 可对条目进行收藏和进度管理
	* 条目的收藏状态有：想看、在看、看过、抛弃
	* 用户可以对可以分别加以文字评论、加标签、创建收藏夹来对条目进行分类。
* 条目评分模块
	* 条目评分分布
	* 条目平均分、方差
	* 条目好友评分
	* 同类型作品里条目的总排名
* 条目讨论模块
	* 由用户发起讨论，其他用户可以在其中发言（类似贴吧）

## 功能

* 1.收藏条目
* 2.好友动态
* 3.评论及互动

>### 收藏条目

* 状态为在看的条目会出现在用户首页，方便直接更新进度
* 收藏条目模块
	* 可以进行评分，分为5档评分
	* 可以添加标签，标签建议来自于当前条目相同标签最多的五个标签，也可以添加自定义标签
	* 进阶：通过个人评分模式来为用户推荐作品

>### 好友动态

* 有新的完成进度，会出现在所有好友的动态中（类似github的activity）
* 用户的条目状态改变，会出现在所有好友的动态中（如对条目的状态由“在看”改为“看过”）
* 可以发布简单的文字日志，会出现在所有好友的动态中（类似朋友圈和说说）

>### 评论及互动

* 用户之间可以加好友
	* 好友之间可以发送私信（类似邮件）
	* 好友之间可以分享作品，收到分享者会看到条目基本信息以及发起分享者的评分与评论
	* 进阶：通过好友关系和作品喜好，来判断出社群。
* 用户之间的交流在讨论版块下进行
	* 可以与多个条目进行关联，关联后会出现在对应条目的讨论模块里
