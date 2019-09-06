
import json
import sys
import importlib
importlib.reload(sys)
tag2id=json.load(open('tag2id.json','r',encoding='utf-8'))
useritem=json.load(open('user.json','r',encoding='utf-8'))
tag=json.load(open('tag.json','r',encoding='utf-8'))
all=[]
for items in useritem:
    useritems=[]
    for item in items:
        tags=[]
        for tmptag in tag:
            if int(tmptag["itemId"]) == int(item):
                tags.append(tag2id[tmptag["content"]])
        if len(tags)>0:
            useritems.append(tags.copy())
        tags.clear()

    all.append(useritems.copy())
    useritems.clear()
jsonstr=json.dumps(all,ensure_ascii=False)
newdata=open('item2tag.json','w',encoding='utf-8')
newdata.write(jsonstr)


