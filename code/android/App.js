import React from "react";
import { View, Text ,Button,TextInput} from "react-native";
import { createMaterialTopTabNavigator,createStackNavigator, createAppContainer } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import HomeScreen from './loginpage'
import DetailsScreen from './browsepage'
import Itemdetail from './itemdetail'
import Topicpage from './topicpage'
import Activitypage from './activity'
const AppNavigator = createMaterialTopTabNavigator(
  {
    Home:  HomeScreen,
    Browse: DetailsScreen,
    Topic: Topicpage,
    Activity: Activitypage
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  },
  
);

const MainScreenNavigator = createStackNavigator({
  
  Home: { screen: createAppContainer(AppNavigator) },
  Detail:{screen: Itemdetail},
  
  
},
{
  initialRouteName: "Home",
    defaultNavigationOptions: {
      
      header:null,
    },
    
});
export default createAppContainer(MainScreenNavigator);