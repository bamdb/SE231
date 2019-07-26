import React from "react";
import { View, Text ,TextInput,StyleSheet} from "react-native";
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
                response.data.map(
                  friend=>{
                    axios.get("http://202.120.40.8:30741/activity/userid/"+friend.id+"?access_token="+global.access_token).then(
                        function(res){
                          var newdata=[];
                          res.data.map(activity=>
                            {
                              activity.set("username",friend.username);
                              newdata.push(activity);
                            })
                          activities=activities.concat(newdata);                
                          this.setState({
                              activities:activities,                              
                          });
                        }
                    )
                  }
                )
            }.bind(this)
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
                <Image src={"http://202.120.40.8:30741/image/id/"+activity.activity.itemid+"1"}></Image>
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {rows}
      </View>
    );
  }
}