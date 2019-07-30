import React from "react";
import { View, Text ,TextInput,StyleSheet,ScrollView} from "react-native";
import Button from '@ant-design/react-native/lib/button';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import ItemList from './itemlist'
import Navigationbar from "./navigationbar";


export default class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
          
          
        };
    }
  constructor(props)
  {
    super(props);
  }
  componentWillMount()
  {
    if(global.access_token==null)
    {
      this.props.navigation.navigate("Home")
    }
  }
  componentDidMount()
  {
    
  }
  render() {
    var itemlist=[{item:{id:1,itemname:"three body"}}];
    return (
      <View >
        <ItemList navigation={this.props.navigation} itemlist={itemlist}></ItemList>
      </View>
    );
  }
}