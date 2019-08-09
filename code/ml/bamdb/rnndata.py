
import json
import numpy as np
import sys
import importlib
importlib.reload(sys)
item2tag=json.load(open('item2tag.json','r'))
X = []
Y = []
count = 0
for items in item2tag:
    i = len(items)
    if i-5<1:
        continue
    for i in range(i-5):
        x1 = np.zeros(71)
        x2 = np.zeros(71)
        x3 = np.zeros(71)
        x4 = np.zeros(71)
        x5 = np.zeros(71)
        y = np.zeros(71)
        x1[items[i]] = 1
        x2[items[i+1]] = 1
        x3[items[i+2]] = 1
        x4[items[i+3]] = 1
        x5[items[i + 4]] = 1
        y[items[i + 5]] = 1/len(items[i + 5])
    X1 = []
    X1.append(list(x1))
    X1.append(list(x2))
    X1.append(list(x3))
    X1.append(list(x4))
    X1.append(list(x5))
    X.append(list(X1).copy())
    X1.clear()
    Y.append(list(y).copy())
jsonstr=json.dumps(X,ensure_ascii=False)
newdata=open('x.json','w')
newdata.write(jsonstr)
jsonstr1=json.dumps(Y,ensure_ascii=False)
newdata1=open('y.json','w')
newdata1.write(jsonstr1)
