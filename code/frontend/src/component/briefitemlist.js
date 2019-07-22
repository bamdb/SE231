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
    }
    render(){
        return(
            <Paper>
                <Grid container  >
                    <Grid item xs={5}>
                        <img src={this.props.imgurl} id="itemimage" />
                    </Grid>
                    <Grid item xs={7}>
                        <br/>
                        <Typography variant={"h6"}  color={"textPrimary"} >{this.props.itemName}</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"} >出版时间：{this.props.pubTime}</Typography>
                        <br/>
                        <Typography variant={"subtitle2"} color={"textSecondary"} >作者：{this.props.mainAuthor}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

class Briefitemlist extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const brieflist = this.props.data;
        var rows=[];
        if(brieflist===undefined) return <Typography color={"textSecondary"}>暂无</Typography>;
        else {
            for(var i=0;i<brieflist.length;i++)
                rows.push(
                    <Briefitem
                        itemName={brieflist[i].itemname}
                        author={brieflist[i].mainAuthor}
                        imgurl={brieflist[i].imgurl}
                        pubTime={brieflist[i].imgurl}
                    />
                    );
        }
        return(
            <Grid container justify={"center"} alignContent={"center"}>
                {rows}
            </Grid>
        );
    }
}

export default Briefitemlist;