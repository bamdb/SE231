import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Websocket from 'react-websocket';
import {Icon, Badge, Button} from 'antd';
import Messagepage from "../page/messagepage";
import Drawer from "@material-ui/core/Drawer";

class Head extends Component{
    constructor(props) {
        super(props);
        this.state={
            islogin : (localStorage.getItem("userid") != null),
            openMess:false,
            messageCount:0
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

    handleMessOpen() {
        this.setState({openMess:true,messageCount:0})
    }

    handleMessClose() {
        this.setState({openMess:false})
    }
    render(){
        const url="";
        return(
            <div >
                <div id={"header"}>
                <Grid container justify={"space-between"}>
                    <Grid item xs={3} id={"bamdb"}>
                        <Typography variant="h6" noWrap color={"inherit"}>Bamdb</Typography>
                    </Grid>
                    <Grid item  id={"header-icon"}>
                    <Button type={"link"} >
                        <Icon type="login" style={{fontSize:18,paddingLeft:8}}  hidden={this.state.islogin} component={Link} to={'/login'}/>
                    </Button>
                        <Icon type="logout" style={{fontSize:18,paddingLeft:8}}  hidden={!this.state.islogin}
                              onClick={this.logout} />
                        <Badge count={this.state.messageCount} overflowCount={99} offset={[8,0]} >
                            <Icon type="message" style={{fontSize:18,paddingLeft:8}} onClick={this.handleMessOpen} />
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

/*

                <Websocket url={url}
                           onMessage={this.handlesocket.bind(this)}/>
 */