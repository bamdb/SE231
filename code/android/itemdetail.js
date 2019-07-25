import React from "react";
import { View, Text ,TextInput,Image,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Button from '@ant-design/react-native/lib/button';
import Storage from 'react-native-storage'
import axios from 'axios'
import Navigationbar from "./navigationbar";
export default class Itemdetail extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            
            
          };
      }
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return(
            <View>
                <Text>
                    hello
                </Text>
            </View>
        )
    }
}