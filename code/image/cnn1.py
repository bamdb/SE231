from __future__ import print_function
from PIL import Image
import numpy as np
from keras.layers import Dense, Dropout, Flatten,Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.models import Sequential
from keras.utils.vis_utils import plot_model
import tensorflow as tf
import numpy as np
from tensorflow import keras







x=[]
y=[]
all=[]
enum=range(75)
enum=np.array(enum)
np.random.shuffle(enum)
for i in enum:
    filename="video/4/img_"+str(int(i%3))+" ("+str(int(i/3)+1)+ ").jpg"
    im = Image.open(filename)
    im=im.resize((128, 128))
    data = im.getdata()
    data = np.array(data)
    data=np.reshape(data,(128,128,3))
    x.append(data.copy())
    y.append(i%3)
    if i%100==0:
        print("finish")


x=np.array(x)
x=x/255.0
y=np.array(y)
model = tf.keras.models.Sequential([

  tf.keras.layers.Conv2D(64, (2, 2), (1, 1), padding='same', input_shape=(128, 128,3),kernel_regularizer=keras.regularizers.l2(0.01)),
  tf.keras.layers.ReLU(),
  tf.keras.layers.MaxPool2D((2, 2)),
  tf.keras .layers.Flatten(),

  tf.keras.layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x, y, epochs=5)
model.predict(x[0:20])
