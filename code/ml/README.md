# recommend
## data
* banmgumi-item.json
* bamgumi.json(1-20)
## train data
* x_train (8760,5180)
* y_train (8760,5180)
## itemid2id map
* planb-item2id.json(item总数为5180)
* planb-id2item.json
## train network
### model1
    model = keras.Sequential([
    keras.layers.Dense(10000, input_shape=(5180,)),
    keras.layers.Dense(7500),
    keras.layers.Dense(5180, activation='softmax')
    ])
### model2
    model = keras.Sequential([
    keras.layers.Dense(8000, input_shape=(5180,)),
    keras.layers.Dense(7000),
    keras.layers.Dense(5180, activation='softmax')
    ])
## how to use
* 输入的数据为一个数组(size=(none,5180))，使用one-hot编码，把看过的itemid通过item2id转化为id,array[id]=1 形成类似【0，0，0，1，0******】的数组
## model
### use in python model1
#### the model stored in model1.json and weight1.json use tensorflow.keras
* the model is stored in *model1.json* 
* the weight is stored in *weight1.h5*
### use in java model2
#### havenot find useful way to use model using tensorflow.keras in java,so i use keras which backend is tensorflow to generate model which can use in java 
* the model is stored in *model2.pb*
* the model load is the same as the example 