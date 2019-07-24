UserHomePage

	我的主页：“我的图书（进度）” “我的电影（进度）” “条目排行榜”
    ajax请求：
        1. /rating/browser: 获取排行榜数据 
            params:
                {
                    type:0,
                    page:0,
                    pageSize:10
                }
            response:[{
                        "item": { /* item信息 可删去"pubTime""chapterNum" 加一条“briefIntroduction" */ },
                        "rating": { /* 排名信息，建议增加收藏人数 */}
                      }]                
       
        2. .Progressmanage: /activity/userid/{userid} 根据userid获取对应用户的“收藏图书”与“收藏电影” 
            
            response：
                [{
                    item: /* item details */
                    activity: /* activity details （按照chapter-section是否看过传回数组） */
                },...]
                
                
        3. .Progressmanage.Scheduletable: activity/update/progress 将修改后进度传入后端 
            data:
                {userid:1, itemid:1, chapters:{chpterNum:1, finish:0, sections:[0,0,0,0]}}
            response:
                state:
                    null:出错
                    原data: 正确
                     

ItemBrowserPage

    页面内容：条目浏览，分为图书、电影，用户可以收藏/跳转详细页面，编辑员可delete一个条目
    url:/itembrowse/book or /itembrowse/movie
    ajax：
        1. /rating/browser 获取排行榜数据，同上
		
		2. .Tags 需要获取热门/推荐tag，现在只有虚假数据
		
        3. .Itemlist: 
		
			3.1 /activity/update/progress 新建进度项，根据用户收藏状态创建progress
                “想看”“在看”为全false，“看过”为全true，“搁置”与“抛弃”不可创建新的progress。 
        
			3.2 /item/delete/id/{id} editor有权限删除item
		
		4. .Itemlist.Collectform
		
			4.1 /item/tag/id/{id} 获取item的tag信息
			4.2 /activity/add
			4.3 /comment/insert
			4.4 /rating/update
			4.5 /item/add/tag
            (4.2-4.5均为新建操作)
			
        PS  “在看”的初始值不应为全空，
			想看、在看、看过、抛弃、搁置互相之间的转化应有规则限制。
			

Topicpage
		
    页面内容：显示热门条目
    (未完待续。。
    
UserInfopage

    用户个人信息
    ajax：
        1. /rating/browser 用于获取最热条目信息，制作流动图片
        
    
