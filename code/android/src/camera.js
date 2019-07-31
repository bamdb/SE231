import React,{ PureComponent } from "react";
import { StyleSheet, View, Text , Animated,TextInput, Dimensions,} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,InputItem,Flex} from '@ant-design/react-native'
import Storage from 'react-native-storage'
import axios from 'axios'
import { RNCamera } from 'react-native-camera';

export default class camera2 extends React.Component{
    constructor(props)
    {
        super(props)
        this.barcodeReceived=this.barcodeReceived.bind(this);
        this.state={code:""}
    }
    
    barcodeReceived(e)
    {
        if(e)
        {
            
            this.setState({code:e.data})
            axios.put("http://202.120.40.8:30741/auth/settoken",{uuid:e.data,token:global.access_token}).then(
                function(res)
                {
                    alert("success:"+res,data);
                }
            ).catch(
                function(err)
                {
                    alert("fail:"+err.data)
                }
            )
            this.props.navigation.navigate("Topic")
        }
        else{
            alert("fail")
        }
    }
    
    render()
    {
        
        return(
            
            <RNCamera
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                type={RNCamera.Constants.Type.back}
                googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                flashMode={RNCamera.Constants.FlashMode.auto}
                onBarCodeRead={(e) => this.barcodeReceived(e)}
            >
           

            </RNCamera>
            
        )
    }
}

