import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList,Image} from "react-native";
import {Button,Card,Flex }from '@ant-design/react-native';
import { createStackNavigator, createAppContainer,withNavigation } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import ItemList from './itemlist'
import { AsyncStorage } from 'react-native';


export default class Acticitypage extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {


        };
    }
  constructor(props)
  {
    super(props);
    this.state={activities:[]}
  }
  componentWillMount()
  {

  }
  componentDidMount()
  {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      if(global.access_token==null)
      {
        this.props.navigation.navigate("Home");
      }
      var activities=[];
      this.setState({activities:activities})
      AsyncStorage.getItem("userid",(error,result)=>{
        axios.get('https://api.bamdb.cn/friend/all/userid/'+result).then(
              function(response){

                  response.data.map(
                    friend=>{
                      axios.get("https://api.bamdb.cn/activity/userid/"+friend.id).then(
                          function(res){
                            var newdata=[];
                            for(var i=0;i<res.data.length;++i)
                            {
                              var tmpmap=res.data[i]
                              tmpmap["username"]=friend.username;
                              newdata.push(tmpmap);
                            }
                            this.setState({activities:this.state.activities.concat(newdata)})

                          }.bind(this)
                      ).catch(
                        function(err)
                        {
                          alert(err);
                        }
                      )
                    }
                  )
              }.bind(this)
          ).catch(
            function(err)
            {
              alert(result)
              window.location.reload();
            }
          )
      })

    });

  }
  componentWillUnmount() {

  }
  render() {

    return (
      <FlatList
        data={this.state.activities}
        renderItem={({item}) =>
        <Card >
            <Card.Header
              title={item.username}
              thumbStyle={{ width: 30, height: 30 }}
              thumb={"http://"+item?item.item?item.item.imgurl:"":""}
              extra=""

            />
            <Card.Body>
              <View  style={{ height: 20 }}>
                <Flex justify="start">
                  <Flex.Item style={{flex:1}}>
                  <Image source={{uri:"http://"+item?item.item?item.item.imgurl:"":""}} style={{width:40,height:40}}></Image>
                  </Flex.Item>
                  <Flex.Item style={{flex:5}}>
                  <Text onPress={()=>this.props.navigation.navigate("Itemdetail",{itemid:item.item.id})}>{item.item?item.item.itemname:""}</Text>
                  </Flex.Item>


                </Flex>
              </View>
            </Card.Body>
            <Card.Footer
              content={"time:"+item.activity.actTime}
              extra={"author: "+item?item.item?item.item.mainAuthor:"":""}
            />
          </Card>
      }

      >

      </FlatList>
    );
  }
}
