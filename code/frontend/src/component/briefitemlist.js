/*
 * 前作、续集、相关作品list 渲染
 */

import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {Link} from "react-router-dom";

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
            itemname:'',
            imgurl: null,
            pubTime: '',
            mainAuthor:''
        }
        this.click = this.click.bind(this)
    }
    componentWillMount() {
        if(this.props.itemid != null)
        {
            axios.get('https://api.bamdb.cn/item/id/'+this.props.itemid)
                .then(function (res) {
                    if(res.status == 200){
                        this.setState({
                            itemname:res.data.itemname,
                            imgurl:res.data.imgurl,
                            pubTime:res.data.pubTime,
                            mainAuthor:res.data.mainAuthor,
                        })
                    }
                }.bind(this))
        }
    }

    click(itemid){
        const win=window.open('about:blank');
        win.location.href="/itemdetail/"+itemid;
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.itemid != null)
        {
            axios.get('https://api.bamdb.cn/item/id/'+nextProps.itemid)
                .then(function (res) {
                    if(res.status == 200){
                        this.setState({
                            itemname:res.data.itemname,
                            imgurl:res.data.imgurl,
                            pubTime:res.data.pubTime,
                            mainAuthor:res.data.mainAuthor,
                        })
                    }
                }.bind(this))
        }
    }

    render(){
        return(
            <span onClick={this.click.bind(this,this.props.itemid)}>
                <Grid container alignContent={"space-around"} >
                    <Grid item xs={5}>
                        <img src={"http://"+this.state.imgurl} style={{width:64,height:64}} />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant={"subtitle1"}  color={"textPrimary"} >{this.state.itemname}</Typography>
                        <Typography variant={"subtitle2"} color={"textSecondary"} >作者：{this.state.mainAuthor}</Typography>
                    </Grid>
                </Grid>
            </span>
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
        var isempty=true;
        if(brieflist!==undefined)
        for(var i=0;i<brieflist.length;i++) {
            rows.push(
                <Briefitem itemid={brieflist[i].target}/>
            );
            isempty=false
        }
        if(isempty) return <Typography color={"textSecondary"}>暂无</Typography>;
        else return(
            <Grid container justify={"center"} alignContent={"center"}>
                {rows}
            </Grid>
        );
    }
}

export default Briefitemlist;