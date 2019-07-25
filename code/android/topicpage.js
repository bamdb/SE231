import React from "react";
import { View, Text ,TextInput,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Button from '@ant-design/react-native/lib/button';
import Storage from 'react-native-storage'
import axios from 'axios'
import Navigationbar from "./navigationbar";
export default class Topicpage extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            
          };
      }
    constructor(props)
    {
        super(props);
    }
    componentDidMount()
    {
        axios.get("http://202.120.40.8:30741/topic/all").then(
            function (response){

            this.setState({topics:response.data});
        }.bind(this)
        )
    }    
    render()
    {
        return(
            <View>
                <Text>topic</Text>
            </View>
        )
    }
}