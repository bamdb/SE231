import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import '../css/item.css'
import {Button} from "@material-ui/core";
import Topic from "./topic";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
    },
}));


/*
* 需要传入的props(需要以List形式传入，通过ForEach以topic渲染)
* props.topicId : 话题id
* props.content : 话题内容
* props.author : 话题发布者
* props.replyTotal : 话题回复总数
* props.date : 发布时间
*/

class TopicList extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics:[],
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps, nextContext) {

        console.log(nextProps.topics);
        this.setState({topics:nextProps.topics})
    }

    render(){
        var topics=this.state.topics;
        var item=[];
        if(topics!==undefined)
        {
            for(var i=0;i<topics.length;++i)
            {
                item.push(
                    <Grid item xs={6}>
                        <Topic
                            topicId = {topics[i].id}
                            content = {topics[i].title}
                            author = {topics[i].userId}
                            replyTotal = {233}
                            date = {topics[i].pubTime}
                        />
                    </Grid>
                )
                debugger;
            }
        }



        return(
            <Grid container spacing={0} direction={"column"}>

                {item}
            </Grid>
        )
    }
}

export default TopicList;