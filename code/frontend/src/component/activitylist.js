/*
 * 动态列表格式渲染
 *
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
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
        const activities=this.props.activities;
        if(activities!==undefined)
        {
            for(var i=0;i<activities.length;++i)
            {
                rows.push(
                    <ListItem className={useStyles.listitem}>
                        <Activity
                            userId={activities[i].activity.userId}
                            username={activities[i].activity.userId}
                            date={activities[i].activity.actTime}
                            actType={activities[i].activity.actType}
                            itemId={activities[i].item.itemname}
                        />
                    </ListItem>
                )

            }
        }

        return (
            <List className={useStyles.root}>
                {rows}
            </List>
        );
    }
}

export default Activitylist;