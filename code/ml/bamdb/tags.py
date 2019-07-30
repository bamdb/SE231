import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
tag_info=json.load(open('tag.json','r'))
item_info=json.load(open('item.json','r'))
idset=set()
new_item=[]
for tag in tag_info:
    idset.add(tag["itemId"])
for item in item_info:
    if(item["itemId"] in idset):
        new_item.append(item)
jsonstr=json.dumps(new_item,ensure_ascii=False)
newdata=open('item1.json','w')
newdata.write(jsonstr)
