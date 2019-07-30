import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import PersonOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { Icon, Button } from 'antd';
import Messagepage from "../page/messagepage";
import Drawer from "@material-ui/core/Drawer";

class Head extends Component{
    constructor(props) {
        super(props);
        this.state={
            islogin : (localStorage.getItem("userid") != null),
            openMess:false
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


    handleMessOpen() {
        this.setState({openMess:true})
    }

    handleMessClose() {
        this.setState({openMess:false})
    }
    render(){
        return(
            <div >
                <Grid container>
                    <Grid item xs={2} id={"header"}>
                        <Typography variant="h6" noWrap color={"inherit"}>Bamdb</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            color="textPrimary"
                            size={"small"}
                            hidden={this.state.islogin}>
                            <Icon type="login" component={Link} to={'/login'}/>
                        </IconButton>
                        <IconButton
                            color="textPrimary"
                            size={"small"}
                            hidden={!this.state.islogin}
                            onClick={this.logout}>
                            <Icon type="logout" />
                        </IconButton>
                        <IconButton
                            color={"inherit"}
                            type={"link"}
                            size={"small"}
                            onClick={this.handleMessOpen}>
                            <Icon type="mail" />
                        </IconButton>
                    </Grid>
                </Grid>
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