import json
import sys
import importlib
import numpy as np
importlib.reload(sys)
items=json.load(open('planb-item.json','r',encoding='utf-8'))
itemset=set()
for item in items:
    itemset.add(item)
item2id=json.load(open('planb-item2id.json','r',encoding='utf-8'))
tmpcontainerx=[]
tmpcontainery=[]
allx=[]
ally=[]
i=0
files=['bangumi.json','bangumi1.json','bangumi2.json','bangumi3.json','bangumi4.json','bangumi5.json','bangumi6.json','bangumi7.json','bangumi8.json','bangumi9.json','bangumi10.json','bangumi11.json','bangumi12.json','bangumi20.json',]
for file in files:
    user_info=json.load(open(file,'r',encoding='utf-8'))
    for user in user_info:
        tmpcontainerx.clear()
        tmpcontainery.clear()
        if "anime" in user.keys():
            x=0
        else:
            continue
        if type(user["anime"]) == dict:
            continue
        if user["anime"] is None:
            continue
        if len(user["anime"][0]["collects"])<3:
            continue
        collectx = user["anime"][0]["collects"][1]
        for item in collectx["list"]:
            if str(item["subject"]["id"]) in itemset:
                tmpcontainerx.append(item2id[str(item["subject"]["id"])])
        collecty = user["anime"][0]["collects"][2]
        for item in collecty["list"]:
            if str(item["subject"]["id"]) in itemset:
                tmpcontainery.append(item2id[str(item["subject"]["id"])])
        if len(tmpcontainerx) > 0 and len(tmpcontainery)>0:
            tmpx=np.zeros(5180)
            tmpy=np.zeros(5180)
            tmpx[np.array(tmpcontainerx)]=1
            tmpy[np.array(tmpcontainery)]=1
            allx.append(tmpx.tolist())
            ally.append(tmpy.tolist())



jsonstr=json.dumps(allx,ensure_ascii=False)
newdata=open('x1.json','w',encoding='utf-8')
newdata.write(jsonstr)
jsonstr=json.dumps(ally,ensure_ascii=False)
newdata=open('y1.json','w',encoding='utf-8')
newdata.write(jsonstr)