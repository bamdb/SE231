from tensorflow import keras
from tensorflow.keras.models import model_from_json
import numpy as np
import json
model = model_from_json(open('model1.json').read())
model.load_weights('weight1.h5', by_name=True)
#  input is a one-hot array whose input[id]=1
input = np.zeros((1, 5180))
#  output is the possibility of each id whose shape is (,5180)
output = np.argsort(model.predict(input))
print(np.argsort(model.predict(input))[0][0:10])
id2item=json.load(open('planb-id2item.json','r'))
#  change the id into itemid
print(id2item[str(output[0][0])])
