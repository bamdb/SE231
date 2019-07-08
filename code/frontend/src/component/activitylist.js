/*
 * 进度列表
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Listitem from "./listitem";
import Comment from "./comment";
import Typography from "@material-ui/core/Typography";
import Activity from "./activity";

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
    constructor(props) {
        super(props);
        this.state={
            username: this.props.username,
            activities: this.props.activities,
        }
    }


    render() {
        var rows=[];
        this.state.activities.forEach((activity) =>{
            rows.push(
                <ListItem className={useStyles.listitem}>
                    <Activity
                        username={"???"}
                        date={"2019-1-1"}
                        actType={1}
                        itemid={1}
                    />
                </ListItem>
            );
        })
        return (
            <List className={useStyles.root}>
                {rows}
                <ListItem>
                    <Activity
                        username={"用户名"}
                        date={"2000-1-1"}
                        grade={"null"}
                        actType={1}
                        itemid={1}
                        comment={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging\n" +
                        "across all continents except Antarctica"}
                        status={"看过"}
                        itemname={"条目名"}
                    />
                </ListItem>
                <ListItem>
                    <Activity
                        username={"用户名"}
                        date={"2000-1-1"}
                        grade={"null"}
                        comment={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging\n" +
                        "across all continents except Antarctica"}
                        status={"看过"}
                        itemname={"条目名"}
                    />
                </ListItem>
            </List>
        );
    }
}

export default Activitylist;