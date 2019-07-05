# backend microservices
* registr
    * 服务注册
* config-server
    * 配置中心
* gateway
    * 网关
* user-service（yyj）
    * 用户信息管理（三种角色）
* friend-service（调用user, auth）(yyj)
    * 好友管理
* message-service （调用user, auth, friend）（）
    * 私信
* auth-service （调用user）（）
    * 登陆注册
    * 权限验证
* topic-service （调用user, auth）（wzl）
    * 话题信息管理
    * 调用user服务判断发言用户是否存在
*  item-service （调用user, auth）（wzl）
    * 条目信息管理
* rating-item-service （调用user, auth, item）（wzl）
    * 条目评分与排名
* starring-item-service （调用user, auth, item）(wzl)
    * 条目收藏在看等状态
* image-service （调用user, auth, item）（yyj）
    * 图片信息管理
* comment-service （调用user, auth, item）（yyj）
    * 评论信息管理
