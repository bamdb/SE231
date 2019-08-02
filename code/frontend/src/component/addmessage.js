/*
 * 收藏
 */

import React, {Component} from "react";
import {List, notification, Card, Button} from 'antd';
import "antd/dist/antd.css";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import {Avatar} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';



const openNotificationWithIcon = type => {
    notification[type]({
        message: "发送成功",
        description:
            "Your message has been sent successfully ",
        duration:3,
        placement:"topRight",
        top: 80,
    });
};


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        maxWidth : 100,
        marginLeft: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

class Addmessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            hidden:false,
            to:0,
            visible:true,
            tolist:[]
        };
        this.showModal = this.showModal.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    handleOk()
    {
        var date = Date.parse(new Date())
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        axios.post("http://202.120.40.8:30741/message/add",{senderId:localStorage.getItem("userid"),receiverId:this.state.to,senTime:date,content:this.state.text},{params:{}});
        openNotificationWithIcon('success');
        this.handleCancel();
    }
    handleCancel()
    {
        this.setState({visible:true,hidden:false})
    }
    handletextchange(e)
    {
        this.setState({text:e.target.value});
    }
    handlechange(e)
    {
        this.setState({to:e.target.value});
    }

    showModal(){
        this.setState({
            visible: false,
            hidden:true
        })
    }
    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        axios.get('http://202.120.40.8:30741/friend/all/userid/1',{params:{}}).then(
            function(response){
                this.setState({tolist:response.data})
            }.bind(this)
        )
    }

    render() {
        var rows=[];
        for(var i=0;i<this.state.tolist.length;++i)
        {
            rows.push(
                <MenuItem value={this.state.tolist[i].id}>{this.state.tolist[i].username}</MenuItem>
            )
        }
        return (
            <div>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    hidden={this.state.hidden}
                    icon={<SpeedDialIcon />}
                    onClick={this.showModal}
                    direction={"up"}
                />
                <List.Item hidden={this.state.visible}>
                    <Card>
                    <Grid container style={{padding:20}}>
                        <Grid item xs={3}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                        to
                        </InputLabel>
                        </Grid>
                        <Grid item xs={9}>
                        <Select
                            value={this.state.to}
                            onChange={this.handlechange}
                            input={<Input name="age" id="age-label-placeholder" />}
                            name="age"
                        >
                        {rows}
                    </Select>
                        </Grid>
                        <br/>
                        <br/>
                        <Grid item xs={3}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        内容
                    </InputLabel>
                        </Grid>
                        <Grid item xs={9}>
                    <TextField value={this.state.text} onChange={this.handletextchange} >
                    </TextField>
                    </Grid>
                        <br/>
                        <br/>
                        <Grid item xs={6} alignContent={"center"} justify={"center"}>
                            <Button onClick={this.handleOk}>发送</Button>
                        </Grid>
                        <Grid item xs={6} alignContent={"center"} justify={"center"}>
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Grid>
                    </Grid>
                    </Card>
                </List.Item>
            </div>
        )
    }
}

export default Addmessage;

