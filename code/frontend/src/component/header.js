import React, { Component } from 'react';
import { Link } from'react-router-dom'
import '../index.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Websocket from 'react-websocket';
import {Icon, Badge, Button} from 'antd';
import Messagepage from "../page/messagepage";
import Drawer from "@material-ui/core/Drawer";
import Alert from "./alert";

class Head extends Component{
    constructor(props) {
        super(props);
        this.state={
            islogin : (localStorage.getItem("userid") != null),
            openMess:false,
            messageCount:0,
            content:""
        }
        this.logout = this.logout.bind(this);
        this.handleMessClose = this.handleMessClose.bind(this);
        this.handleMessOpen = this.handleMessOpen.bind(this);
    }
    logout()
    {
        localStorage.clear();
        window.location.reload();
    }

    handlesocket(){
        this.setState({messageCount:this.state.messageCount+1});
    }

    handleAlert(){
        this.setState({content:""})
    }

    handleMessOpen() {
        if(localStorage.getItem("userid"))
        this.setState({openMess:true,messageCount:0})
        else this.setState({content:'请先登录！'})
    }

    handleMessClose() {
        this.setState({openMess:false})
    }
    render(){
        const url="ws://47.103.123.5:8080/websocket/nouuid/"+localStorage.getItem("userid");
        const web = (localStorage.getItem("userid")) ?
            <Websocket url={url}
                       onMessage={this.handlesocket.bind(this)}/>:<span/>;
        return(
            <div >
                {web}
                <Alert content={this.state.content} cancelAlert={this.handleAlert.bind(this)} confirmAlert={this.handleAlert.bind(this)}/>
                <div id={"header"}>
                <Grid container justify={"space-between"}>
                    <Grid item xs={3} id={"bamdb"}>
                        <Typography variant="h6" noWrap color={"inherit"}>Bamdb</Typography>
                    </Grid>
                    <Grid item >
                    <Button type={"link"}>
                        <Link to={'/login'} >
                        <Icon type="login" id={"header-icon"}  hidden={this.state.islogin} />
                        </Link>
                    </Button>
                        <Icon type="logout" id={"header-icon"}  hidden={!this.state.islogin}
                              onClick={this.logout} />
                        <Badge count={this.state.messageCount} overflowCount={99} offset={[8,0]} >
                            <Icon type="message" id={"header-icon"} onClick={this.handleMessOpen} />
                        </Badge>
                    </Grid>
                </Grid>
                </div>
                <Drawer
                    anchor={"right"}
                    open={this.state.openMess}
                    onClose={this.handleMessClose}
                >
                    <div id={"message"}>
                        <Messagepage />
                    </div>
                </Drawer>
            </div>

        )
    }
}

export default Head;