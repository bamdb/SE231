import React from "react";
import { View, Text ,Button,TextInput} from "react-native";
import { createMaterialToppTabNavigator,createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Grid, Icon } from '@ant-design/react-native';
import Storage from 'react-native-storage'
import axios from 'axios'
import HomeScreen from './loginpage'
import DetailsScreen from './browsepage'
import Itemdetail from './itemdetail'
import Topicpage from './topicpage'
import Activitypage from './activity'
import Topicdetail from './topicdetail'
import BasicTabBarExample from "./test";

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='login' color={tintColor} size={24} />
        )
      },
    },
    Browse: {
      screen:DetailsScreen,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <Icon name='table' color={tintColor} size={24} />
        )
      }
    },
    Topic: {
      screen:Topicpage,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <Icon name='menu' color={tintColor} size={24} />
        )
      }
    },
    Activity:{
      screen:Activitypage,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <Icon name='bell' color={tintColor} size={24} />
        )
      }
    },
    
        
  },
  {
    initialRouteName: 'Home',
    shifting:false,
    activeColor: 'purple',
    inactiveColor: 'white',
    barStyle: { backgroundColor: 'pink' },
  },
  
);

const MainScreenNavigator = createStackNavigator({
  
  Home: { screen: createAppContainer(AppNavigator) },
  
  Itemdetail:{screen: Itemdetail},
  Topicdetail:{screen: Topicdetail},
  
  
},
{
  initialRouteName: "Home",
    defaultNavigationOptions: {
      
      header:null,
    },
    
});
export default createAppContainer(MainScreenNavigator);