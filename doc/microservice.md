* 用户服务（yyj）
    * 登陆注册
    * 用户信息管理
    * 好友管理
    * 好友与私信服务
* 话题讨论服务（）
    * 话题信息管理
    * 需要与用户服务交互
* 条目服务（wzl）
    * 评分和排名存在item对象里，lazy bind
* 收藏、评分与排名服务（）
    * 用户收藏
    * 用户评分
    * 平均分计算
    * 排名计算
* 图片服务
    * 存储静态图片
* registry
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
