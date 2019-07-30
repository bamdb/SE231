import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
tag_info=json.load(open('bamgumi-tag.json','r'))
item_info=json.load(open('item.json','r'))
new_tag_info=[]
idset=set()
tagdict={}
idset1=set()
for item in item_info:
    idset.add(item["itemId"])
for tag in tag_info:
    if (tag["itemId"] in idset) and (int(tag["count"])>500) :
        if tagdict.get(tag["content"]):
            tagdict[tag["content"]]+=1
        else:
            tagdict[tag["content"]]=1

for (k,v) in tagdict.items():
    if (int(v)>4):
        idset1.add(k)
for tag in tag_info:
    if (tag["content"] in idset1) and (tag["itemId"] in idset) and (int(tag["count"])>500):
        new_tag_info.append(tag)
        
        
jsonstr=json.dumps(new_tag_info,ensure_ascii=False)
newdata=open('tag.json','w')
newdata.write(jsonstr)