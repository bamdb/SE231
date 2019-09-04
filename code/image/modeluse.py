from __future__ import print_function
from PIL import Image
import numpy as np
from tensorflow import keras
filename="video/1/img_100.jpg"
im = Image.open(filename)
im=im.resize((128, 128))
data = im.getdata()
data = np.array(data)
data=np.reshape(data,(128,128,3));
input=data[None,:,:,:]
input=input/255.0
model=keras.models.model_from_json(open('model.json').read())
model.load_weights('weight.h5', by_name=True)
print(model.predict(input))