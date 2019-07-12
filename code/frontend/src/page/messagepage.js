import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Userinfo from "../component/userinfo";
import Commentlist from "../component/commentlist";
import Listitem from '../component/listitem'
import Progressmanage from "../component/progressmanage";
import Login from "../component/login"
import Messagelist from "../component/messagelist";
import Addmessage from "../component/addmessage";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

class Messagepage extends Component{
    constructor(props){
        super(props);

        this.state={type:"receive",value:0};
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e,newvalue)
    {
        this.setState({value:newvalue})
    }

    render(){
        return(
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <Tabs  value={this.state.value} onChange={this.handleChange}>
                                <Tab label="收件箱" value={"senderid"}/>
                                <Tab label="发件箱" value={"receiverid"}/>

                            </Tabs>
                        </Grid>

                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <br/>
                            <Messagelist type={this.state.type}></Messagelist>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Addmessage></Addmessage>
                </Grid>
            </Grid>
        )
    }
}

export  default Messagepage;