import React from "react";
import { View, Text ,TextInput,Image,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Button from '@ant-design/react-native/lib/button';
import Storage from 'react-native-storage'
import axios from 'axios'
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
            rows.push(<View>
                <Button onPress={()=>this.props.navigation.navigate('Detail',{itemid:item.item.id})}>{item.item.itemname}</Button>
                <Image style={styles.image} source={{uri:"http://202.120.40.8:30741/image/id/"+item.item.id+"0"}}></Image>
            </View>)
        })
        return(
            <View>
                {rows}    
            </View>
        )
    }
}
