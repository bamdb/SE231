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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    listitem: {
        height: 500,
    }
}));

class Activitylist extends Component {

    render() {
        var rows=[];
        const activitylist=this.props.activities;
        if(activitylist!==undefined)
        {
            activitylist.map(act =>{
                const user=act.user;
                const activities = act.activities;
                activities.map(activity=>{
                    if(activity.activity.actType>=1||activity.activity.actType<=5) {
                        rows.push(
                                <Activity
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