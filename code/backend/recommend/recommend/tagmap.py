import json
import sys
import importlib
importlib.reload(sys)
tag_info=json.load(open('tag.json','r',encoding='utf-8'))
tags=set()
tag2id={}
id2tag={}
for tag in tag_info:
    tags.add(tag["content"])
id2tag=dict(enumerate(tags))
tag2id=dict(zip(id2tag.values(), id2tag.keys()))
jsonstr=json.dumps(id2tag,ensure_ascii=False)
newdata=open('id2tag.json','w',encoding='utf-8')
newdata.write(jsonstr)
jsonstr1=json.dumps(tag2id,ensure_ascii=False)
newdata1=open('tag2id.json','w',encoding='utf-8')
newdata1.write(jsonstr1)