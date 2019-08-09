import React,{ PureComponent } from "react";
import { StyleSheet, View, Text , Animated,TextInput, Dimensions,Easing,AsyncStorage} from "react-native";
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
        this.state={code:"",moveAnim: new Animated.Value(0),focusedScreen:false}
    }
    componentDidMount()
    {
        const { navigation } = this.props;
        navigation.addListener("willFocus", () =>
        {
            this.startAnimation();
            this.setState({ focusedScreen: true })
            
        }
        
        );
        navigation.addListener("willBlur", () =>
        this.setState({ focusedScreen: false, showModal: false })
        );

    }
    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -300,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
      };
    
    barcodeReceived(e)
    {
        if(e)
        {
            
            this.setState({code:e.data})
            
            AsyncStorage.getItem("access_token",(error,result)=>{
                
                axios.put("http://202.120.40.8:30741/auth/settoken",{},{params:{uuid:e.data,token:result}}).then(
                function(res)
                {
                    alert("success");
                    this.props.navigation.navigate("Topic")
                }.bind(this)
            ).catch(
                function(err)
                {
                    alert("fail");
                }
            )
            
            })
            
        }
        else{
            alert("fail")
        }
    }
    
    render()
    {
        
        return(
            
            this.state.focusedScreen &&<RNCamera
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
                <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}/>
                <Animated.View
                style={[styles.border,
                { transform: [{ translateY:this.state.moveAnim }] }
                ]}
                />
                </View>
            </RNCamera>
            
        )
    }
}
const styles= StyleSheet.create(
    {
        border:{
            flex: 0,
            width: 300,
            height: 2,
            backgroundColor: '#00FF00',
        },
        rectangleContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
        rectangle: {
            height: 300,
            width: 300,
            borderWidth: 1,
            borderColor: '#00FF00',
            backgroundColor: 'transparent'
        },
    }
)