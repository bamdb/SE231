# image recognize
## arch of network
    model = tf.keras.models.Sequential([

    tf.keras.layers.Conv2D(64, (2, 2), (1, 1), padding='same', input_shape=(128, 128,3),kernel_regularizer=keras.regularizers.l2(0.01)),
    tf.keras.layers.ReLU(),
    tf.keras.layers.MaxPool2D((2, 2)),
    tf.keras.layers.Conv2D(128, (2, 2), (1, 1), padding='same', kernel_regularizer=keras.regularizers.l2(0.01)),
    tf.keras.layers.ReLU(),
    tf.keras.layers.MaxPool2D((2, 2)),
    tf.keras .layers.Flatten(),

    tf.keras.layers.Dense(3, activation='softmax')
    ])
## data
* input (:,128,128,3)(the image should be reshaped in to(128,128,3))
* output (3) [x,y,z] x is cowboy y is eva z is tianyuan
## model
### use in python model
#### the model stored in model1.json and weight1.json use tensorflow.keras
* the model is stored in *model.json* 
* the weight is stored in *weight.h5*
### use in java model1
#### havenot find useful way to use model using tensorflow.keras in java,so i use keras which backend is tensorflow to generate model which can use in java 
* the model is stored in *model1.pb*
* the model load is the same as the example 
