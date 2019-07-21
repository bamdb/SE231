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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
}));

class Commentlist extends Component {
    constructor(props) {
        super(props);
        this.state={comments:[]};
    }
    componentWillMount() {
        this.setState({comments:this.props.comments||[]});
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
                </Grid>
            )
        }

        return (
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <Comment
                     username = {"abc"}
                     date = {"2000-1-1"}
                     grade = {8}
                     comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                     "gingacross all continents except Antarctica"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Comment
                        username = {"abc"}
                        date = {"2000-1-1"}
                        grade = {8}
                        comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                        "gingacross all continents except Antarctica"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Comment
                        username = {"abc"}
                        date = {"2000-1-1"}
                        grade = {8}
                        comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                        "gingacross all continents except Antarctica"}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Commentlist;