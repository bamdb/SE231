import React from "react";
import { View, Text ,Button,TextInput} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storage from 'react-native-storage'
import axios from 'axios'
import HomeScreen from './loginpage'
import DetailsScreen from './browsepage'
import Itemdetail from './itemdetail'


const AppNavigator = createStackNavigator(
  {
    Home:  HomeScreen,
    Browse: DetailsScreen,
    Detail: Itemdetail
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

export default createAppContainer(AppNavigator);