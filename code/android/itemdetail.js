import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,List} from '@ant-design/react-native';
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
        );
        axios.get("http://202.120.40.8:30741/comment/itemid/"+this.props.navigation.getParam("itemid")).then(
            function(res)
            {
                this.setState({comments:res.data});
            }.bind(this)
        )
    }
    render()
    {
        
        return(
            <View>
                
                <Image style={{width:100,height:100}}></Image>
                <List>
                    <List.Item>
                        title:three body
                    </List.Item>
                    <List.Item>
                        author:Liu Cixin
                    </List.Item>
                    <List.Item>
                        pubtime:2000-01-01
                    </List.Item>
                    <List.Item>
                        chapternum:10
                    </List.Item>
                </List>
                
            </View>
        )
    }
}