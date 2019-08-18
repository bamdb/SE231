import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView,FlatList,SectionList} from "react-native";
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
        this.state={selectedTab:"book",itemlist:[{item:{id:5,itemname:"three body"},rating:{avgScore:10}}],current:0};
        this.changetab=this.changetab.bind(this);
        this.handlebottom=this.handlebottom.bind(this)

    }
    handlebottom()
    {
        var type=this.state.selectedTab
        var tmptype=""
        if(type=='book')
        {
          tmptype=0
        }else if(type=='movie')
        {
          tmptype=1
        }
        else{
          tmptype=2
        }
        var current=this.state.current+1;
        axios.get(
              "https://api.bamdb.cn/rating/browser",{params:{
                      type:tmptype,
                      page:current,
                      pageSize:10
                  }}
          )
          .then(
            function (response) {
              this.setState({itemlist: this.state.itemlist.concat(response.data),selectedTab:type,current:current});
              console.log(response.data);
          }.bind(this)
          ).catch(
            function (err)
            {
                alert(err);
            }
          )
    }
    changetab(type)
    {
        var tmptype=""
        if(type=='book')
        {
          tmptype=0
        }else if(type=='movie')
        {
          tmptype=1
        }
        else{
          tmptype=2
        }
        axios.get(
              "https://api.bamdb.cn/rating/browser",{params:{
                      type:tmptype,
                      page:0,
                      pageSize:10
                  }}
          )
          .then(
            function (response) {
              this.setState({itemlist: response.data,selectedTab:type,current:0});
              console.log(response.data);
          }.bind(this)
          ).catch(
            function (err)
            {
                alert(err);
            }
          )
    }
    componentDidMount()
    {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
      if(global.access_token==null)
      {
        this.props.navigation.navigate("Home");
      }
      var tmptype=0;
      if(this.state.selectedTab=='book')
      {
        tmptype=0
      }
      else if(this.state.selectedTab=='movie'){
        tmptype=1
      }
      else{
        tmptype=2
      }
      axios.get(
            "https://api.bamdb.cn/rating/browser",{params:{
                    type:tmptype,
                    page:0,
                    pageSize:10
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
                        icon={<Icon name="ordered-list" />}
                        selected={this.state.selectedTab === 'book'}
                        onPress={() => this.changetab('book')}
                      >
                      </TabBar.Item>
                      <TabBar.Item
                        title="movie"
                        icon={<Icon name="ordered-list" />}
                        selected={this.state.selectedTab === 'movie'}
                        onPress={() => this.changetab('movie')}
                      >

                      </TabBar.Item>
                        <TabBar.Item
                        title="comic"
                        icon={<Icon name="ordered-list" />}
                        selected={this.state.selectedTab === 'comic'}
                        onPress={() => this.changetab('comic')}
                      >

                      </TabBar.Item>

                </TabBar>
            </View>
            <View style={{height:550}}>
              <FlatList
                  data={this.state.itemlist}
                  renderItem={
                    ({item}) =>
                        <Card >
                        <Card.Header
                          title={item.item.itemname}
                          thumbStyle={{ width: 30, height: 30 }}
                          thumb={"http://"+item.item.imgurl}
                          extra=""

                        />
                        <Card.Body>
                          <View onPress={()=>this.props.navigation.navigate('Itemdetail',{itemid:item.item.id})} style={{ height: 10 }}>
                            <Text onPress={()=>this.props.navigation.navigate('Itemdetail',{itemid:item.item.id})} style={{ marginLeft: 10 }}>detail</Text>
                          </View>
                        </Card.Body>
                        <Card.Footer
                          content="分数"
                          extra={item.rating.avgScore}
                        />
                      </Card>
                }
                onEndReached={()=>this.handlebottom()}
                >

              </FlatList>
          </View>

          </View>
        )






    }
}
