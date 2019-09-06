from __future__ import print_function
import keras
import tensorflow as tf
import numpy as np
import json
tmpx=json.load(open('x1.json','r'))
tmpy = json.load(open('y1.json', 'r'))
x=np.array(tmpx)
y=np.array(tmpy)
model = keras.Sequential([
keras.layers.Dense(8000, input_shape=(5180,)),
keras.layers.Dense(7000),
keras.layers.Dense(5180, activation='softmax')
])

model.compile(loss="binary_crossentropy", optimizer="Adam",metrics=['accuracy'])
model.fit(x, y, batch_size=64, epochs=5)
jsonstr=model.to_json()
open("model2.json",'w').write(jsonstr)
model.save_weights('weight2.h5')




