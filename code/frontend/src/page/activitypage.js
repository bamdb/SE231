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
            username: "游客",
            userid:1,
            activities: [{activity:{userId:1,actTime:2019-7-1,actType:0},item:{itemname: "three body"}},
                {activity:{userId:1,actTime:2019-7-2,actType:0},item:{itemname: "three body"}}],
            search:"",
            isloaded: false,
            friends:[],
            len:0
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.finduser=this.finduser.bind(this);
        this.findfriends=this.findfriends.bind(this);
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

        axios.get('http://202.120.40.8:30741/friend/all/userid/'+userid).then(
            function(response){
                friends = response.data;
                console.log(response.data);

        var temp=[];
        if(this.state.len!==friends.length)
        {
            this.setState({len:friends.length});
            var activities=[];
            friends.map(friend=>{
                axios.get("http://202.120.40.8:30741/activity/userid/"+friend.id)
                    .then(function (res) {
                            temp.push({
                                user: friend,
                                activities: res.data,
                            })
                            console.log(temp);
                            activities.push(temp);
                        }.bind(this)
                    )
                    .catch(function (error) {
                    })
            });
            this.setState({
                activities:activities,
                userid:userid,
                friends:friends
            })
        }
            }
        )
    }


    async findfriends()
    {

    }
    async finduser()
    {

    }

    handleSearch(value){
        this.setState({search:value});
    }

    render(){
        var activities=this.state.activities.sort((a,b)=>{
            return a.activity.actTime>b.activity.actTime;
        });
        return(
            <Grid container direction={"column"} >

                <Grid container direction={"row"} >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} >
                        <br/><br/>
                        <Activitylist
                            activities={activities}
                            />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Activitypage;
