import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Listitem from '../component/listitem'
import Activitylist from "../component/activitylist";
import axios from 'axios';


class Activitypage extends Component{
    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            activities: [],
            isloaded: false,
        }
    }

    componentDidMount() {
        const _this=this;
        axios.post("http://202.120.40.8:30741/activity/userid/1")
            .then(function (res) {
                _this.setState({
                    activities: res.data,
                    isloaded: true,
                });
            })
            .catch(function (error) {
            })
    }

    render(){
        return(
            <Grid container direction={"column"} >
                <Grid item xs={12}><Navigation/></Grid>
                <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={8} >
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Activitylist activities={this.state.activities} username={this.state.username}></Activitylist>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Activitypage;