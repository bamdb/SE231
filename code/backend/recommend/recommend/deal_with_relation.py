import json
import sys
import importlib
importlib.reload(sys)
relation_info=json.load(open('bamgumi-relation.json','r',encoding='utf-8'))
item_info=json.load(open('item.json','r',encoding='utf-8'))
new_relation_info=[]
idset=set()
for item in item_info:
    idset.add(item["itemId"])
for relation in relation_info:
    if (relation["target"] in idset) and (relation["source"] in idset):
        new_relation_info.append(relation)
jsonstr=json.dumps(new_relation_info,ensure_ascii=False)
newdata=open('relation.json','w',encoding='utf-8')
newdata.write(jsonstr)
