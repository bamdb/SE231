from __future__ import print_function
from keras.layers import Dense, Activation
from keras.layers.recurrent import SimpleRNN
from keras import regularizers
from keras.layers import LSTM
from keras.layers import Dropout
from keras.models import Sequential
from keras.utils.vis_utils import plot_model
import numpy as np
import json
tagnums=71
len=5
dropout=0.4
neurons=128
x=json.load(open('x.json','r'))
nx=np.array(x)
y = json.load(open('y.json', 'r'))
ny=np.array(y)
x_train=nx
y_train=ny
x_test=nx[6000:]
y_test=ny[6000:]

model = Sequential()
model.add(LSTM(512,input_shape=(len,tagnums),return_sequences=True))
model.add(Dropout(dropout))
model.add(LSTM(256,return_sequences=True))
model.add(Dropout(dropout))
model.add(LSTM(128))
model.add(Dropout(dropout))
model.add(Dense(tagnums))
model.add(Activation("softmax"))
model.compile(loss="categorical_crossentropy", optimizer="Adam",metrics=['accuracy'])
for iter in range(25):
    model.fit(x_train, y_train, batch_size=64, epochs=5)
print("test\n")
print(model.evaluate(x_test, y_test))
print(np.argsort(model.predict(np.zeros((1,5,71)))))
jsonstr=model.to_json()
open("model.json",'w').write(jsonstr)
model.save_weights('weight.h5')




