import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,List, Card, Flex,Drawer,  WhiteSpace} from '@ant-design/react-native';
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
        this.state={item:{},comments:[{comment:{content:"hello"},user:{id:"1"}}],showprogress:false,
        progress:{
            "userId": 1,
            "itemId": 1,
            "chapters": [
              {
                "chapterNum": 1,
                "finish": 1,
                "sections": [
                  0,
                  1,
                  0
                ]
              }
            ]
          }
        }
        this.handlepress=this.handlepress.bind(this)
    }
    handlepress(i,j)
    {
        alert(i+"."+j)

        var progress=this.state.progress;
        progress.chapters[i].sections[j]=!progress.chapters[i].sections[j];
        this.setState({progress:progress})

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
        axios.get("http://202.120.40.8:30741/activity/progress",{params:{itemId:this.props.navigation.getParam("itemid"),userId:global.userid}}).then(
            function(res){
                this.setState({showprogress:true,progress:res.data})
            }.bind(this)
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
       var rows1=[]
        if(this.state.showprogress)
        {
            var i=0;
            rows1.push(
                this.state.progress.chapters.map(
                    chapter=>{
                        var j=0
                        chapter.sections.map(section=>{
                            var tmpi=i;
                            var tmpj=j;
                            rows1.push(
                                
                                <Button type={this.state.progress.chapters[i].sections[j]?"primary":"warning"} style={{width:80,felx:1}} onPress={()=>this.handlepress(tmpi,tmpj)}>
                                    {i+"."+j}
                                </Button>
                                
                            )
                            j++
                        })

                    }
                )
            )
        }
        var item=this.state.item;
        return(
            <View>
                <View style={{alignItems:"center"}}>
                <Image style={{width:200,height:200}} source={{uri:"http://"+item.imgurl}}></Image>
                </View>
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
                {this.state.showprogress&&
                <Flex justify="start">
                {rows1}
                </Flex>
                }
                
                <List>
                    {rows}
                </List>
                
            </View>
        )
    }
}