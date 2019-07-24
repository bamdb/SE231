import React from "react";
import { View, Text ,TextInput} from "react-native";
import Button from '@ant-design/react-native/lib/button';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import ItemList from './itemlist'


export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Browse',
      };
  constructor(props)
  {
    super(props);
  }
  
  componentDidMount()
  {
    /*const _this = this;   
    var type = 0;   
    this.setState({type:type})
    var currentpage=this.state.currentpage;
    axios.get(
        "http://202.120.40.8:30741/rating/browser",{params:{
                type:type,
                page:currentpage,
                pageSize:10
            }}
    )
    .then(function (response) {
        _this.setState(
            {
                ItemList: response.data,
                isloaded: true,
            }
        );
        console.log(response.data);
    })
    .catch(function (error) {
        _this.setState({
        })
    })*/
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