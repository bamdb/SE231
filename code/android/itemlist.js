import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,Card,Pagination,TabBar}from '@ant-design/react-native';
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
        this.state={selectedTab:"book"}

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
          <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#f5f5f5"
        >
          <TabBar.Item
            title="book"
            
            selected={this.state.selectedTab === 'book'}
            onPress={() => this.setState({
              selectedTab: 'book',
            })}
          >
            <Text>book</Text>
          </TabBar.Item>
          <TabBar.Item
            title="movie"
            
            selected={this.state.selectedTab === 'movie'}
            onPress={() => this.setState({
              selectedTab: 'movie',
            })}
          >
            <Text>movie</Text>
          </TabBar.Item>
          </TabBar>
          <FlatList
              data={itemlist}
              renderItem={
                ({item}) => 
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
            }>
                
          </FlatList>
          </View>
        )

              
                
                
                 
           
    }
}
