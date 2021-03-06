import React from "react";
import {
  View,
  Text,
  Button,
  TextInput
} from "react-native";
import {
  createMaterialToppTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import {
  createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";
import {
  Grid,
  Icon
} from '@ant-design/react-native';
import Storage from 'react-native-storage'
import axios from 'axios'
import HomeScreen from './src/loginpage'
import DetailsScreen from './src/browsepage'
import Itemdetail from './src/itemdetail'
import Topicpage from './src/topicpage'
import Activitypage from './src/activity'
import Topicdetail from './src/topicdetail'
import Collect from './src/collect'
import userinfo from "./src/userinfo";
import camera2 from "./src/camera";

const AppNavigator = createMaterialBottomTabNavigator({
    Userinfo: {
      screen: userinfo,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'login'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      },
    },
    Browse: {
      screen: DetailsScreen,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'table'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      }
    },
    Topic: {
      screen: Topicpage,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'menu'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      }
    },
    Activity: {
      screen: Activitypage,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'bell'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      }
    },
    Collect: {
      screen: Collect,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'bell'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      }
    },
    scanning:{
      screen:camera2,
      navigationOptions: {
        tabBarIcon: ({
          tintColor
        }) => ( <
          Icon name = 'scan'
          color = {
            tintColor
          }
          size = {
            24
          }
          />
        )
      }
    }


  }, {
    initialRouteName: 'Topic',
    shifting: false,
    activeColor: 'purple',
    inactiveColor: 'white',
    barStyle: {
      backgroundColor: 'pink'
    },
  },

);

const MainScreenNavigator = createStackNavigator({

  Login:{
    screen: HomeScreen
  },
  Home: {
    screen: createAppContainer(AppNavigator)
  },

  Itemdetail: {
    screen: Itemdetail
  },
  Topicdetail: {
    screen: Topicdetail
  },


}, {
  initialRouteName: "Login",
  defaultNavigationOptions: {

    header: null,
  },

});
export default createAppContainer(MainScreenNavigator);