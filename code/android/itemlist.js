import React from "react";
import { View, Text ,TextInput,Image,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,Card }from '@ant-design/react-native';
import Storage from 'react-native-storage';
import axios from 'axios';
import Navigationbar from "./navigationbar";
const styles=StyleSheet.create({
    image:{
        height:50,
        width:50
    }
})
export default class Itemlist extends React.Component{
    constructor(props)
    {
        super(props);

    }
    componentWillMount()
    {

    }
    render()
    {
        var itemlist=this.props.itemlist
        var rows=[];
        itemlist.map(item=>{
            rows.push(/*<View>
                <Button onPress={()=>this.props.navigation.navigate('Detail',{itemid:item.item.id})}>{item.item.itemname}</Button>
                <Image style={styles.image} source={{uri:"http://202.120.40.8:30741/image/id/"+item.item.id+"0"}}></Image>
            </View>*/
            
            <Card >
            <Card.Header
              title={item.item.itemname}
              thumbStyle={{ width: 30, height: 30 }}
              thumb={"http://202.120.40.8:30741/image/id/"+item.item.id+"0"}
              extra=""
              
            />
            <Card.Body>
              <View onPress={()=>this.props.navigation.navigate('Itemdetail',{itemid:item.item.id})} style={{ height: 10 }}>
                <Text onPress={()=>this.props.navigation.navigate('Itemdetail',{itemid:item.item.id})} style={{ marginLeft: 10 }}>detail</Text>
              </View>
            </Card.Body>
            <Card.Footer
              content="hello"
              extra="footer extra content"
            />
          </Card>
          
            )
        })
        return(
            <View>
                {rows}    
            </View>
        )
    }
}
