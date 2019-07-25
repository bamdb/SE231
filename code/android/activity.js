import React from "react";
import { View, Text ,TextInput,StyleSheet} from "react-native";
import Button from '@ant-design/react-native/lib/button';
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
  }
  
  componentDidMount()
  {
    
  }
  render() {
    var itemlist=[{item:{id:1,itemname:"three body"}}];
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ItemList navigation={this.props.navigation} itemlist={itemlist}></ItemList>
      </View>
    );
  }
}