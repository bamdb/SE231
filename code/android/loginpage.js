import React from "react";
import { View, Text ,TextInput} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Button from '@ant-design/react-native/lib/button';
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
                alert("success");
                global.access_token=res.data.access_token;
                global.username=this.state.username;
                axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
                this.props.navigation.navigate('Browse');
                
              }.bind(this)
            ).catch(
              function(err)
              {
                
                alert("fail");
                
              }
            )
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>username</Text>
        <TextInput onChangeText={(text) => this.setState({username:text})} value={this.state.username} ></TextInput>
        <Text>password</Text>
        <TextInput onChangeText={(text) => this.setState({password:text})} value={this.state.password} ></TextInput>
        <Button  onPress={this.handlesubmit}>login</Button>
        <Button  onPress={()=>this.props.navigation.navigate('Browse')}>next</Button>
      </View>
    );
  }
}