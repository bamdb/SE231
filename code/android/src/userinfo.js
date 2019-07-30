import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList,Image} from "react-native";
import {Button,Card,Flex, List }from '@ant-design/react-native';
import { createStackNavigator, createAppContainer,withNavigation } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
export default class userinfo extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={userinfo:{username:"test",id:"1",mail:"dasdada"}}
    }
    componentWillMount(){
        axios.get("http://202.120.40.8:30741/auth/username/"+global.username).then(
            function(res){
                this.setState({userinfo:res.data})
            }.bind(this)
        )
    }
    render()
    {
        return(
            <View>
                <Flex justify="center">
                    
                    <Flex.Item >
                    <Image source={{uri:"http://202.120.40.8:30741/image/id/10"}} style={{width:400,height:400}}></Image>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                    <List>
                        <List.Item extra={this.state.userinfo.username}>
                            用户名
                        </List.Item>
                        <List.Item extra={this.state.userinfo.id}>
                            用户id
                        </List.Item>
                        <List.Item extra={this.state.userinfo.mail}>
                            邮箱
                        </List.Item>
                    </List>
                    </Flex.Item>
                </Flex>
                <Flex justify="center">
                    <Flex.Item>
                    <Button onPress={()=>this.props.navigation.navigate("Login")}>logout</Button>
                    </Flex.Item>
                </Flex>
            </View>
        )
    }
}