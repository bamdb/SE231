/*
 * 动态列表格式渲染
 *
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, Avatar, Icon, Divider} from 'antd';
import ListItem from '@material-ui/core/ListItem';
import Listitem from "./listitem";
import Comment from "./comment";
import Typography from "@material-ui/core/Typography";
import Activity from "./activity";
import Grid from "@material-ui/core/Grid";
import Topic from "./topic";
import axios from "axios";


class Activitylist extends Component {

    constructor(props){
        super(props);
        this.state={
            len:0,
            activities: [],
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const friends=nextProps.friends;
        var temp=[];
        console.log(friends.length)
        if(this.state.len!==friends.length) {
            this.setState({len: friends.length});
            var activities = [];
            friends.map(friend => {
                axios.get("http://202.120.40.8:30741/activity/userid/" + friend.id)
                    .then(function (res) {
                            temp.push({
                                user: friend,
                                activities: res.data,
                            })
                            console.log(temp);
                            activities.push(temp);
                            this.setState({activities:activities})
                        }.bind(this)
                    )
                    .catch(function (error) {
                    })
            });

        }
    }

    render() {
        var rows=[];
        const activitylist=this.state.activities.sort((a,b)=>{
            return a.activity.actTime>b.activity.actTime;
        });
        if(activitylist!==undefined)
        {
            console.log(activitylist);
            activitylist.forEach(act =>{
                act.forEach(act=> {
                    const user = act.user;
                    const activities = act.activities;
                    console.log("act", act)
                    if (activities !== undefined)
                        activities.map(activity => {
                            console.log("start to activity")
                            if (activity.activity.actType >= 0 || activity.activity.actType <= 5) {
                                rows.push(
                                    <Activity
                                        key={user.id}
                                        userId={user.id}
                                        username={user.username}
                                        date={activity.activity.actTime}
                                        actType={activity.activity.actType}
                                        itemname={activity.item.itemname}
                                        itemid={activity.item.id}
                                    />
                                )
                            }
                        })
                })
            })
        }

        return (
            <div>
            <List
                itemLayout="vertical"
                size="large"
                >
                {rows}
            </List>
            </div>
        );
    }
}

export default Activitylist;