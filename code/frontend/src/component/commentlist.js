/*
 * 条目收藏区
 * 显示在“个人中心--收藏夹”
 * 包含 条目图片 条目名 收藏日期 评分 简介
 * img
 * name date grade comment
 */

import React, { Component } from 'react';
import Comment from "./comment";
import Grid from '@material-ui/core/Grid'
import {Divider} from "antd";
import axios from 'axios';

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
                            userid = {comments[i].comment.userId}
                            date = {comments[i].comment.pubTime}
                            comment = {comments[i].comment.content}
                            itemid = {comments[i].comment.itemId}
                            username={comments[i].user.username}
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
