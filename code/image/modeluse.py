from __future__ import print_function
from PIL import Image
import numpy as np
from tensorflow import keras
x=[]
y=[]
all=[]
enum=range(3993)
enum=np.array(enum)
np.random.shuffle(enum)
for i in enum:
    filename="video/"+str(i % 3+1)+"/img_"+str(int(i/3))+".jpg"
    im = Image.open(filename)
    im=im.resize((128, 128))
    data = im.getdata()
    data = np.array(data)
    data=np.reshape(data,(128,128,3));
    x.append(data.copy())
    y.append(i%3)
    if i%100==0:
        print("finish")


x=np.array(x)
x=x/255.0
y=np.array(y)
model=keras.models.model_from_json(open('model.json').read())
model.load_weights('weight.h5', by_name=True)
model.predict(x[100:110])