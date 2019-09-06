
import json
import sys
import importlib
importlib.reload(sys)
item_info=json.load(open('item.json','r',encoding='utf-8'))
itemset=set()
tmpcontainer=[]
all=[]
i=0
for item in item_info:
    itemset.add(item["itemId"])
files=['bangumi.json','bangumi1.json','bangumi2.json','bangumi3.json','bangumi4.json','bangumi5.json','bangumi6.json','bangumi7.json','bangumi8.json','bangumi9.json','bangumi10.json','bangumi11.json','bangumi12.json','bangumi20.json',]
for file in files:
    user_info=json.load(open(file,'r',encoding='utf-8'))
    for user in user_info:
        tmpcontainer.clear()
        if "anime" in user.keys():
            x=0
        else:
            continue
        if type(user["anime"]) == dict:
            continue
        if user["anime"] is None:
            continue
        for collect in user["anime"][0]["collects"]:
            for item in collect["list"]:
                i=i+1
                if str(item["subject"]["id"]) in itemset:
                    tmpcontainer.append(item["subject"]["id"])

        if len(tmpcontainer) > 0:
            all.append(tmpcontainer.copy())



jsonstr=json.dumps(all,ensure_ascii=False)
newdata=open('user.json','w',encoding='utf-8')
newdata.write(jsonstr)


