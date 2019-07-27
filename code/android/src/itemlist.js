import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Icon,Button,Card,Pagination,TabBar}from '@ant-design/react-native';
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
        this.state={selectedTab:"book",itemlist:[{item:{id:5,itemname:"three body"}}]};
        this.changetab=this.changetab.bind(this);

    }
    changetab(type)
    {
          axios.get(
              "http://202.120.40.8:30741/rating/browser",{params:{
                      type:type=='book'?0:1,
                      page:0,
                      pageSize:1000
                  }}
          )
          .then(
            function (response) {
              this.setState({itemlist: response.data,selectedTab:type});
              console.log(response.data);
          }.bind(this)
          ).catch(
            function (err) 
            {
                alert(err);
            }
          )
    }
    componentWillMount()
    {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
      var type='book';
      if(type!=this.state.selectedTab)
      {
        type=1;
      }
      else{
        type=0
      }
      axios.get(
            "http://202.120.40.8:30741/rating/browser",{params:{
                    type:type,
                    page:0,
                    pageSize:1000
                }}
        )
        .then(
          function (response) {
            this.setState({itemlist: response.data,});
            console.log(response.data);
        }.bind(this)
        ).catch(
          function (err) 
          {
              alert(err);
          }
        )
    })
      
    }
    componentWillUpdate()
    {

    }
    render()
    {
        /*var itemlist=this.props.itemlist
        var rows=[];
        itemlist.map(item=>{
            rows.push(
            
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
        })*/
        return(
            <View>
            <View style={{height:50}}>
                  <TabBar
                  unselectedTintColor="#949494"
                  tintColor="#33A3F4"
                  barTintColor="#f5f5f5"
                >
                      <TabBar.Item
                        title="book"
                        icon={<Icon name="home" />}
                        selected={this.state.selectedTab === 'book'}
                        onPress={() => this.changetab('book')}
                      >
                      </TabBar.Item>
                      <TabBar.Item
                        title="movie"
                        icon={<Icon name="ordered-list" />}
                        selected={this.state.selectedTab === 'movie'}
                        onPress={() => this.changetab('book')}
                      >
                      </TabBar.Item>
                </TabBar>
            </View>
            <View >
              <FlatList
                  data={this.state.itemlist}
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
          
          </View>
        )

              
                
                
                 
           
    }
}
