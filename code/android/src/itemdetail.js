import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,List, Card, Flex} from '@ant-design/react-native';
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
        this.state={item:{},comments:[{comment:{content:"hello"},user:{id:"1"}}]}
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
        ).catch(
            function(err)
            {
                alert(err);
            }
        )
    }
    render()
    {
        var rows=[];
        this.state.comments.map(comment=>{
            rows.push(
                <List.Item>
                    <Card>
                        <Flex>
                            <Flex.Item>
                            <Image source={{uri: 'http://202.120.40.8:30741/image/id/'+comment.user.id+"0"}} style={{width:30,height:30}}></Image>
                            </Flex.Item>
                            <Flex.Item>
                            <Text >{comment.comment.content}</Text>
                            </Flex.Item>
                        </Flex>
                    </Card>
                </List.Item>
            )
        })
        var item=this.state.item;
        return(
            <View>
                
                <Image style={{width:100,height:100}} source={{uri:"http:202.120.40.8:30741/image/id/"+item.id+"1"}}></Image>
                <List>
                    <List.Item>
                        {"title: "+item.itemname}
                    </List.Item>
                    <List.Item>
                        {"author: "+item.mainAuthor}
                    </List.Item>
                    <List.Item>
                        {"pubtime: "+item.pubTime}
                    </List.Item>
                    <List.Item>
                        {"chapternum: "+item.chapterNum}
                    </List.Item>
                </List>
                <List>
                    {rows}
                </List>
                
            </View>
        )
    }
}