import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {Link} from "react-router-dom";
import '../css/item.css'
import Grid from '@material-ui/core/Grid/index'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';




/*
* 需要传入的props(需要以列表形式传入，通过map渲染到每个listItem当中)
* props.topicId : 话题id
* props.content : 话题内容
* props.author : 话题发布者
* props.replyTotal : 话题回复总数
* props.date : 发布时间
*/

/* 传值未写，后期不用初始值 */

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

    componentWillMount() {

    }
    componentDidMount()
    {
        if(window.location.href.split("#")[1]!==undefined)
        {
            var x = window.location.href.split("#")[1].split("/")[1];
        }
        if(this.props.topicId!==undefined)
        {
            this.setState({topicId:this.props.topicId,content:this.props.content,author:this.props.author,
                replyTotal:this.props.replyTotal,date:this.props.date});
        }
    }
    render(){
        var content=this.state.content;
        return(
            <div>
                <Divider />
                <ListItem >
                    <Grid container  wrap={"nowrap"}>
                        <Grid item xs={5} >
                            <Link to={'/topicdetail/'+this.state.topicId}><Typography variant={"subtitle1"} color={"textPrimary"}> {content}</Typography></Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant={"subtitle1"}  color={"textSecondary"}>{this.state.author}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant={"subtitle1"} color={"textSecondary"}>{this.state.replyTotal+" replies"}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant={"subtitle1"} color={"textSecondary"}>{this.state.date.split("T")[0]||""}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </div>
        );
    }
}

export default Topic;