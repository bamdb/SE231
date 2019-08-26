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
* input (:,128,128,3)
* output (3) [x,y,z] x is cowboy y is eva z is tianyuan
