/*
 * 条目收藏区
 * 显示在“个人中心--收藏夹”
 * 包含 条目图片 条目名 收藏日期 评分 简介
 * img
 * name date grade comment
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Comment from "./comment";
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import {Divider} from "antd";
import Container from "@material-ui/core/Container";

class Commentlist extends Component {
    constructor(props) {
        super(props);
        this.state={comments:[]};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({comments:nextProps.comments||[]});
    }

    render() {
        var comments=this.state.comments;
        if(comments.length>0)
        {
            var rows=[];
            for(var i=0;i<comments.length;++i)
            {
                rows.push(
                    <Grid item xs={12}>
                        <Comment
                            username = {comments[i].comment.userId}
                            date = {comments[i].comment.pubTime}
                            grade = {8}
                            comment = {comments[i].comment.content}
                        />
                    </Grid>
                )
            }

            return(
                <Grid container spacing={1}>
                    {rows}
                    <Divider />
                </Grid>
            )
        }
        return (
            <span>
                暂无评论
            </span>
        )
    }
}

export default Commentlist;