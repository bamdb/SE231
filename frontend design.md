UserHomePage

	我的主页：“我的图书（进度）” “我的电影（进度）” “条目排行榜”
    ajax请求：
        1. 根据userid获取对应用户的“收藏图书”与“收藏电影”
            params：
                {userid:1, type:0/1, page:0..n, pageSize:4..n}
            response：
                封面
                条目id
                条目名
                类别（book/movie）
                作者/导演
                具体章节进度（按照每一chapter是否看过传回数组）
            eg. [
                {
                封面（我不知道图片用什么格式。。）:???,
                 itemid:1,
                 itemname:"三体",
                 type:0/1,
                 author:"刘慈欣",
                 进度:[1,1,[1,1,0,0],0,0]     //表示chap1-chap3.2已读，chap3.3-chap5未读，后端也可以再改，我只是给个例子
                 },
                 ]


UserHomePage.Progressmanage.Scheduletable         
    
    页面内容：进度编辑
    ajax：
        1.将修改后进度传入后端
            params：
                {userid:1, itemid:1, readstat(进度):[1,1,[1,1,1,1],1,0]}
            response:
                state:(int)
                    0:特殊情况
                    1:成功
                    2:修改前后无差别
                    3:（其他情况）
 

ItemBrowserPage
