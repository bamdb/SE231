import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList,ScrollView,Image} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,Card,Flex }from '@ant-design/react-native';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage'
import axios from 'axios'
export default class Collect extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={activities:[]}
    }
    componentDidMount()
    {
        
        const { navigation } = this.props;
        
        this.focusListener = navigation.addListener("didFocus", () => {
            AsyncStorage.getItem("userid",(error,result)=>
            {
                if(error)
                {
                    
                }
                else{
                    
                    axios.get("http://202.120.40.8:30741/activity/userid/"+result).then(
                        function(res){
                            this.setState({activities:res.data})
                        }.bind(this)
                    ).catch(
                        function(err)
                        {
                            alert(err)
                        }
                    )
                }
                
            })
        
        }
        )
    }
    render()
    {
        return(
            <FlatList 
                data={this.state.activities}
                renderItem={({item}) =>
                <Card >
                    <Card.Header
                    title={item.username}
                    thumbStyle={{ width: 30, height: 30 }}
                    thumb={"http://"+item.item.imgurl}
                    extra=""
                    
                    />
                    <Card.Body>
                    <View  style={{ height: 20 }}>
                        <Flex justify="start">
                        <Flex.Item style={{flex:1}}>
                        <Image source={{uri:"http://"+item.item?item.item.imgurl:""}} style={{width:40,height:40}}></Image>
                        </Flex.Item>
                        <Flex.Item style={{flex:5}}>
                        <Text onPress={()=>this.props.navigation.navigate("Itemdetail",{itemid:item.item.id})}>{item.item.itemname}</Text>
                        </Flex.Item>
                        
                        
                        </Flex>
                    </View>
                    </Card.Body>
                    <Card.Footer
                    content={"time:"+item.activity.actTime}
                    extra={"author: "+item.item.mainAuthor}
                    />
                </Card>
            }
            >            
            </FlatList>
        )
    }
}