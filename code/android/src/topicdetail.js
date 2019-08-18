import React from "react";
import { View, Text ,TextInput,Image,StyleSheet,ScrollView} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { List ,Button,Card,Flex} from '@ant-design/react-native';
import Storage from 'react-native-storage'
import axios from 'axios'
import Navigationbar from "./navigationbar";
export default class Topicdetail extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {


          };
      }
    constructor(props)
    {
        super(props);
        this.state={data:{replyList:[]}};
    }
    componentWillMount()
    {
        axios.get("https://api.bamdb.cn/topic/id/"+this.props.navigation.getParam("topicid","1"))
            .then(
                function (res)
                {
                this.setState({data: res.data});
                }.bind(this)
            ).catch(
                function(err)
                {
                    this.setState({data: {replyList:[{replyContent:"networkerr"}]}});
                }.bind(this)

            )
    }
    render()
    {
        var rows=[];
        this.state.data.replyList.map(
            reply=>{

                rows.push(
                    <List.Item>
                        <Card>
                        <Flex>
                            <Flex.Item>
                            <Image source={{uri:"https://api.bamdb.cn/image/id/"+reply.user.id+"0"}} style={{width:30,height:30}}></Image>
                            </Flex.Item>

                            <Flex.Item>
                            <Text >{reply.replyContent}</Text>
                            </Flex.Item>
                        </Flex>
                        </Card>

                    </List.Item>
                )
            }
        )
        return(

            <ScrollView
                style={{ flex: 1, backgroundColor: '#f5f5f9' }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
            <List renderHeader={'basic'}>
                {rows}
            </List>
            </ScrollView>
        )
    }
}
