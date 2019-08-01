# use of tensorflow in java
* there are 71 tags chosen 
* use id2tag.json and tag2id.json to transform tags into input_data
* use one hot to deal with numbers to float[1][71] etc:{2,"test"}=>{0,0,1,0-------} 
* input_shape: float[1][5][71]
* output_shape: float[1][71]