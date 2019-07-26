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
        this.state={item:{}}
    }
    componentDidMount()
    {
        axios.get("http://202.120.40.8:30741/item/id/"+this.props.navigation.getParam("itemid")).then(
            function(res)
            {
                this.setState({item:res.data});
            }.bind(this)
        )
    }
    render()
    {
        return(
            <View>
                <Image src></Image>
                <Text>
                    {this.state.item.itemname}
                </Text>
            </View>
        )
    }
}