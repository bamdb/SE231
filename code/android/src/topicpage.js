import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList,ScrollView,Image} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,Card }from '@ant-design/react-native';

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
        this.state={topics:[{id:0,title:"networkerr",pubTime:"2000-01-01"}]};
    }
    componentDidMount()
    {
        axios.get("http://202.120.40.8:30741/topic/all").then(
            function (response){

            this.setState({topics:response.data});
        }.bind(this)
        ).catch(
            function(err)
            {
                this.setState({topics:[{id:0,title:"networkerr",pubTime:"2000-01-01"}]})
            }
        )
    }    
    render()
    {
        /*var rows=[];
        this.state.topics.map(topic=>{
            rows.push(
                <Card >
                    <Card.Header
                    title={topic.title}
                    extra={topic.id}
                    />
                    <Card.Body>
                    <View onPress={()=>this.props.navigation.navigate('Topicdetail',{topicid:topic.id})} style={{ height: 10 }}>
                        <Text onPress={()=>this.props.navigation.navigate('Topicdetail',{topicid:topic.id})} style={{ marginLeft: 10 }}>detail</Text>
                    </View>
                    </Card.Body>
                    <Card.Footer
                    content={topic.pubTime}
                    extra="powered by bamdb"
                    />
                </Card>
            )
        })*/
        return(
            /*<View>
                {rows}
            </View>*/
            <FlatList
            data={this.state.topics}
               renderItem={({item}) => 
               <Card >
               <Card.Header
               title={item.title}
               extra={item.id}
               thumb={"http://202.120.40.8:30741/image/id/"+item.id+"1"}
               />
               <Card.Body>
               <View onPress={()=>this.props.navigation.navigate('Topicdetail',{topicid:item.id})} style={{ height: 10 }}>
                   <Text onPress={()=>this.props.navigation.navigate('Topicdetail',{topicid:item.id})} style={{ marginLeft: 10 }}>detail</Text>
               </View>
               </Card.Body>
               <Card.Footer
               content={item.pubTime}
               extra="powered by bamdb"
               />
           </Card>
             
             }
            >
 
            </FlatList>
        )
    }
}