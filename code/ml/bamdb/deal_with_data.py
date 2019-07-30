import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
user_info=json.load(open('bamgumi-item.json','r'))
new_user_info=[]
for info in user_info:
    if int(info["score_details"]["total"])>1000 :
        new_user_info.append(info)
jsonstr=json.dumps(new_user_info,ensure_ascii=False)
newdata=open('item.json','w')
newdata.write(jsonstr)

