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
import {List} from "antd";


class Activitypage extends Component{
    constructor(props){
        super(props);
        this.state={
            username: "游客",
            userid:1,
            search:"",
            isloaded: false,
            friends:[],
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentWillMount() {
        var userid;
        var friends=[];
        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/#/login";
        }
        else {
            userid=localStorage.getItem("userid");
        }
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");

        axios.get('http://202.120.40.8:30741/friend/all/userid/'+userid).then(
            function(response){
                friends = response.data;
                console.log(response.data);


            this.setState({
                userid:userid,
                friends:friends
            })
            }.bind(this)
        )
    }



    handleSearch(value){
        this.setState({search:value});
    }

    render(){
        /*
        var activities=this.state.activities.sort((a,b)=>{
            return a.activity.actTime>b.activity.actTime;
        });

         */
        return(
            <Grid container direction={"column"} >

                <Grid container direction={"row"} >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} >
                        <br/><br/>
                        <Activitylist
                            friends={this.state.friends}
                            />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Activitypage;
