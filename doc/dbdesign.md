# 实体
* 用户简略信息
    * 分为普通用户、编辑人、管理员（表的继承关系）
    * 用户id（primary）
    * 用户名（not null）
        * 最大长度20个字符
    * 用户角色（not null）
        * 0 - 被禁言用户 （无法在讨论区发言的普通用户）
        * 1 - 普通用户
        * 2 - 编辑人 （可以编辑条目的普通用户，被禁言用户无法成为编辑人）
        * 3 - 管理员
    * 用户密码（not null）
        * 最大长度20个字符
    * 用户邮箱（not null）
        * 最大长度20个字符
    * 用户头像url
        * 最大长度50个字符
* 用户~条目关联表：用户对条目收藏
    * 用户id（primary， foreign）
    * 条目id（primary，foreign）
    * 评分
    * 收藏时间
        * 时间戳
    * 用户收藏状态
        * 0 - 未收藏
        * 1 - 想看
        * 2 - 在看
        * 3 - 看过
        * 4 - 搁置
        * 5 - 抛弃
* 条目简略信息
    * 条目id（primary）
    * 条目名（not null）
        * 最大长度20个字符
    * 条目类型 (not null）
        * 0 - 图书
        * 1 - 教程
        * 2 - 电影
        * 3 - 电视剧
        * 4 - 动画
    * 条目章节数（not null）
    * 条目出版时间
        * 时间戳
    * 条目主作者
        * 最大长度20个字符
    * 图片url
        * 最大长度20个字符
* 评分排名信息（一个条目对应一个评分排名信息）
    * 条目id（primary， foreign）
    * 总评分
    * 各段评分
    * 排名
* 讨论板块话题信息
    * 话题id（primary key）
    * 用户id（foreign key）
    * 话题标题
    * 话题发表时间
* 用户动态信息
    * 用户id（primary key，foreign key）
    * 用户进行该动态的时间 (primary key)
    * 用户动态的操作
    * 用户动态所操作的条目id
* 其他关联表
    * 每个条目~多个关联条目
        * 在PDM中两个条目的id属性为prior和subsequent
        * 0 - 简单的关联条目，没有前作和续作关系
        * 1 - 互为前作和续作
    * 每个条目~一个评分排名信息
    * 每个用户~多个好友
    * 每个用户~多个该用户发起的话题
    * 每个用户~多个用户动态
    * 每个编辑人~多个编辑条目
        * 0 - 编辑创作人员列表
        * 1 - 更新图片
        * 2 - 修改章节数
    
# mongodb存的非结构数据
* 评论
    * key：条目id，用户id
    * 返回评论发表时间和评论内容
        * {“pub_time”:”11111000(timestamp)”, “content”:”asdfadwgvaf"}
* 讨论版块话题内容
    * key：话题id
    * 话题内容
    * 讨论内容
        * {“userid”:12，“pub_time”：“111110000（timestamp）”，“floor”：8，”content“：“asdfgh”}
        * 用户id
        * 发表时间
        * 层数
        * 内容
* 用户详细信息
    * key：用户id
    * 用户的个人关联主页
        * [“www.baidu.com”,”www.taobao.com"]
    * 用户的自我简介
* 条目详细信息
    * key：条目id
    * staff列表的json对象
        * { “导演”：“a”，“编剧”：“b”，制片人：“c”}
    * 条目章节数
        * 章数：{8}
        * 节数：[8, 3, 4, 5, 6]
    * 条目的tag和对应选择了该tag作为自定义tag的用户数为一个json对象，返回值为json对象组成的数组
        * [{“tag”:“tag1”,”amount”:100},{“tag”:“tag2”,”amount”:122},{“tag”:“tag3”,”amount”:90}]
    * 其他附加信息（如isbn）
        * {“isbn”:”1234567”, “award” : “some award"}
* 用户私信
    * Key：发送者id和接收者id
    * Value：私信为json对象，返回值为一串json对象组成的array
        * [ {time:“1234500000(timestamp)”, content:”abcabcabcabc"} ,  {time:“1234500001(timestamp)”, content:”abcabcabcabc”} ]
* 完成进度
    * key: 用户id和条目id
    * Value: 每章完成状态（0为未开始，1为已完成，数组为部分完成）
        * [0, 1, 0, 0, [0, 1, 0], 1, 0, 1]
* 用户对条目定的tag
    * key：用户id和条目id
    * value ：由tag字符串组成的array
        * [“tag1”,”tag2”,”tag3"]
* 编辑人的编辑历史
* 管理员的修改历史
