import React from 'react';
import { Text, View,Image } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
export default class Testcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
    };
  }
  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    );
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <Image source={{uri: 'http://202.120.40.8:30741/image/id/'+"1"+"0"}} style={{width:30,height:30}}></Image>
    );
  }
}