import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Login from "../component/login"
import Messagelist from "../component/messagelist";
import Addmessage from "../component/addmessage";
import { Tabs } from 'antd';

const { TabPane } = Tabs;
class Messagepage extends Component{
    constructor(props){
        super(props);

        this.state={
            value:0,
        };
    }
    componentWillMount() {

        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/login";
        }
        else this.setState({userid:localStorage.getItem("userid")})
    }

    render(){
        return(
            <Tabs defaultActiveKey="receiverid" onChange={this.handleChange}>
                <TabPane tab="收件箱" key="receiverid">
                    <Messagelist type="receiverid"/>
                </TabPane>
                <TabPane tab="发件箱" key="senderid">
                    <Messagelist type="senderid"/>
                    <Addmessage />
                </TabPane>
            </Tabs>
        )
    }
}

export  default Messagepage;
