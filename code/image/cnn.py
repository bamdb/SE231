from __future__ import print_function
from PIL import Image
import numpy as np
from keras.layers import Dense, Dropout, Flatten,Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.models import Sequential
from keras.utils.vis_utils import plot_model
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
    Y=np.zeros(3)
    Y[i%3]=1
    y.append(Y.copy())
    if i%100==0:
        print("finish")


x=np.array(x)
y=np.array(y)
model = Sequential()
model.add(Conv2D(32,(2,2),activation='relu',input_shape=(128,128,3)))
model.add(Conv2D(32,(2,2),activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Conv2D(64, (2, 2), activation='relu'))
model.add(Conv2D(64, (2, 2), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(256,activation='relu'))
model.add(Dropout(0.25))
model.add(Dense(3,activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer="Adam",metrics=['accuracy'])
model.fit(x, y,  epochs=20)

jsonstr=model.to_json()
open("model.json",'w').write(jsonstr)
model.save_weights('weight.h5')
print(model.predict(x[1000:1001]))
print(model.predict(x[2000:2001]))
print(model.predict(x[3000:3001]))