import React from "react";
import { View, Text ,TextInput} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button,InputItem,Flex} from '@ant-design/react-native'
import Storage from 'react-native-storage'
import axios from 'axios'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props)
  {
    super(props);
    this.state={username:"",password:""};
    this.handlesubmit=this.handlesubmit.bind(this);
    
  }
  componentDidMount()
  {
    global.username="shenruien";
    
  }
  
  handlesubmit()
  {
        var params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", this.state.username);
        params.append("password", this.state.password);
        params.append("client_id", "browser");
        params.append("client_secret", "");
        axios.post("http://202.120.40.8:30741/auth/oauth/token",
            params,
            {headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials:true}).then(
              function(res)
              {
                
                global.access_token=res.data.access_token;
                global.username=this.state.username;
                axios.defaults.headers.common['Authorization'] = "Bearer "+res.data.access_token;
                
                axios.get("http://202.120.40.8:30741/auth/username/"+this.state.username).then(
                    function(res)
                    {
                        alert("success");
                        global.userid=res.data.id;
                        this.props.navigation.navigate("Browse")                        
                    }.bind(this)

                ).catch(
                  function(err)
                  {
                    alert(err);
                  }
                )
                
                
              }.bind(this)
            ).catch(
              function(err)
              {
                
                alert(err);
                
              }
            )
  }
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",padding:30 }}>
        
        <InputItem
            defaultValue=""
            clear
            value={this.state.username}
            placeholder="username"
            onChangeText={(text) => this.setState({username:text})}
          >
            用户名
          </InputItem>
          <InputItem
            clear
            type="password"
            value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
            placeholder="password"
          >
            密码
          </InputItem>
          <Flex>
            <Flex.Item>
              <Button  type="primary" onPress={this.handlesubmit}>login</Button>
            </Flex.Item>
            
          </Flex>
        
        
        
      </View>
    );
  }
}