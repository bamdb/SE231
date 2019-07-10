/*
 * 前作、续集、相关作品list 渲染
 */

import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

/*
 * Briefitem类  条目简略信息渲染
 *
 * 目前只是界面原型
 * 逻辑未完成
 *
 * 传入数据
 * props.itemName 名称
 * props.briefIntro 简介
 * props.fansTotal 关注人数
 * img 封面
 */

class Briefitem extends Component {
    constructor(props){
        super(props);
        this.state={
            itemName: "三体",
            briefIntro: "中国科幻小说里程碑",
            fansTotal: 90,
        }

    }

    render(){
        return(
            <Paper>
                <Grid container  >
                    <Grid item xs={5}>
                        <img src="img/3.jpg" id="itemimage" />
                    </Grid>
                    <Grid item xs={7}>
                        <br/>
                        <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >{this.state.itemName}</Typography>
                        <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.briefIntro}</Typography>
                        <br/>
                        <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.fansTotal}人关注</Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

class Briefitemlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            brieflist: [],
        }
    }

    render(){
        return(
            <Grid container >
                <Grid item xs={12}>
                <Briefitem />
                </Grid>
                <Grid item xs={12}>
                    <Briefitem />
                </Grid>
                <Grid item xs={12}>
                    <Briefitem />
                </Grid>
            </Grid>
        );
    }
}

export default Briefitemlist;