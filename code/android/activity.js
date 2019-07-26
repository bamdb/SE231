import React from "react";
import { View, Text ,TextInput,StyleSheet,FlatList} from "react-native";
import {Button,Card }from '@ant-design/react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
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
  
  componentDidMount()
  {
    var activities=[];
    axios.get('http://202.120.40.8:30741/friend/all/userid/'+global.userid+"?access_token="+global.access_token).then(
            function(response){
              alert("friend success")
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
  }
  render() {
    var rows=[];
    this.state.activities.map(activity=>
      {
        rows.push(
          <Card >
            <Card.Header
              title={activity.username}
              thumbStyle={{ width: 30, height: 30 }}
              thumb={"http://202.120.40.8:30741/image/id/"+activity.activity.userid+"0"}
              extra=""
              
            />
            <Card.Body>
              <View  style={{ height: 10 }}>
                
                <Text>{activity.item.itemname}</Text>
              </View>
            </Card.Body>
            <Card.Footer
              content="hello"
              extra="footer extra content"
            />
          </Card>
          
        )
      })
    return (
      <FlatList 
        data={this.state.activities}
        renderItem={({item}) =>
        <Card >
            <Card.Header
              title={item.username}
              thumbStyle={{ width: 30, height: 30 }}
              thumb={"http://202.120.40.8:30741/image/id/"+item.activity.userid+"0"}
              extra=""
              
            />
            <Card.Body>
              <View  style={{ height: 10 }}>
                
                <Text onPress={()=>this.props.navigation.navigate("Itemdetail",{itemid:item.item.id})}>{item.item.itemname}</Text>
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