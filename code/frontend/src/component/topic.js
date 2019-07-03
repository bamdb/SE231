import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import '../css/item.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
    },
}));


/*
* 需要传入的props(需要以列表形式传入，通过map渲染到每个listItem当中)
* props.topicId : 话题id
* props.content : 话题内容
* props.author : 话题发布者
* props.replyTotal : 话题回复总数
* props.date : 发布时间
*/

class Topic extends Component {
    constructor(props){
        super(props);
        this.state = {
            topicId: 1,
            content: "你们对SE231有什么看法",
            author: "小猪佩奇",
            replyTotal: 0,
            date: "2019-7-2"
        }
    }

    render(){
        return(
            <List component={"nav"} className={useStyles.root} aria-label="Mailbox folders">
                <Divider />
                <ListItem>
                    <ListItemText primary={this.state.content} />
                    <ListItemText primary={this.state.author} />
                    <ListItemText primary={this.state.replyTotal+" replies"} />
                    <ListItemText primary={this.state.date} />
                </ListItem>
                <Divider />
            </List>
        );
    }
}

export default Topic;