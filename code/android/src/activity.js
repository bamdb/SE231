import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList,Image} from "react-native";
import {Button,Card,Flex }from '@ant-design/react-native';
import { createStackNavigator, createAppContainer,withNavigation } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import ItemList from './itemlist'



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
      axios.get('http://202.120.40.8:30741/friend/all/userid/'+global.userid+"?access_token="+global.access_token).then(
              function(response){
                alert("get friend success")
                  response.data.map(
                    friend=>{
                      axios.get("http://202.120.40.8:30741/activity/userid/"+friend.id+"?access_token="+global.access_token).then(
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
              alert(err);
              window.location.reload();
            }
          )
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
              thumb={"http://202.120.40.8:30741/image/id/"+item.activity.userId+"0"}
              extra=""
              
            />
            <Card.Body>
              <View  style={{ height: 20 }}>
                <Flex justify="start">
                  <Flex.Item style={{flex:1}}>
                  <Image source={{uri:"http://202.120.40.8:30741/image/id/10"}} style={{width:20,height:20}}></Image>
                  </Flex.Item>
                  <Flex.Item style={{flex:5}}>
                  <Text onPress={()=>this.props.navigation.navigate("Itemdetail",{itemid:item.item.id})}>{item.item.itemname}</Text>
                  </Flex.Item>
                  
                
                </Flex>
              </View>
            </Card.Body>
            <Card.Footer
              content={"time:"+item.activity.actTime}
              extra="footer extra content"
            />
          </Card>
      }
      
      >
        
      </FlatList>
    );
  }
}