import React from "react";
import { View, Text ,TextInput,Image,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Button from '@ant-design/react-native/lib/button';
import Storage from 'react-native-storage'
import axios from 'axios'
export default class Itemdetail extends React.Component{
    static navigationOptions =({ navigation }) => {
        return {
            title: "detail "+navigation.getParam('itemid', '1'),
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