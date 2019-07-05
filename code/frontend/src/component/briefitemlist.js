import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

/*
 * 条目简略信息
 * itemName 名称
 * img 封面
 * briefIntro 简介
 * fansTotal 关注人数
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
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <img src="img/3.jpg" id="itemimage" />
                    </Grid>
                    <Grid item xs={8}>
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
            <Grid xs={12} >
                <Briefitem />
                <Briefitem />
                <Briefitem />
            </Grid>
        );
    }
}

export default Briefitemlist;