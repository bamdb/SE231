import React from "react";
import { View, Text ,TextInput,StyleSheet} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Icon, SearchBar, TabBar,Button,Flex } from '@ant-design/react-native';
import Storage from 'react-native-storage'
import axios from 'axios'
export default class Navigationbar extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={selectedTab: 'redTab',}
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
    render()
    {
        return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="#f5f5f5"
        >
            <TabBar.Item
            title="Life"
            icon={<Icon name="home" />}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {this.onChangeTab('blueTab');this.props.navigation.navigate("Browse");}}
            >
            {this.renderContent('browe')}
            </TabBar.Item>
            <TabBar.Item
            icon={<Icon name="ordered-list" />}
            title="Koubei"
            badge={2}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {this.onChangeTab('redTab');this.props.navigation.navigate("Topic");}}
            >
            {this.renderContent('topic')}
            </TabBar.Item>
        </TabBar>
            /*<View>
                <Flex style={{width:300}}>
                    <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                        <Button style={styles.buttonview} onPress={()=>this.props.navigation.navigate("Browse")}>browse</Button>
                    </Flex.Item>
                    <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                        <Button style={styles.buttonview} onPress={()=>this.props.navigation.navigate("Topic")}>topic</Button>
                    </Flex.Item>
                </Flex>
            </View>*/
        )
    }

}
const styles=StyleSheet.create({
    buttonview:{
       
    }
})