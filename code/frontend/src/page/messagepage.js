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
            window.location.href="/#/login";
        }
        else this.setState({userid:localStorage.getItem("userid")})
    }

    render(){
        return(
/*
            <Grid container spacing={10}>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <Tabs  value={this.state.value} onChange={this.handleChange}>
                                <Tab label="收件箱" value={"senderid"}/>
                                <Tab label="发件箱" value={"receiverid"}/>

                            </Tabs>
                        </Grid>

                        <Grid item xs={3}/>
                        <Grid item xs={6}>
                            <br/>
                            <Messagelist type={this.state.type}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Addmessage />
                </Grid>
            </Grid>

 */
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
