import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';

import '../css/item.css'
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Item extends Component {
    constructor(props) {
        super(props);
        this.state={name:"",date:"",author:"",pages:"",imgurl:""}
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.name!=null)
        {
            this.setState({name:nextProps.name,author:nextProps.anthor,date:nextProps.date,pages:nextProps.pages,imgurl:nextProps.imgurl})
        }
    }

    componentDidMount() {
    }


    render() {
        var imgurl = this.state.imgurl.substring(0, 4) == "http"? this.state.imgurl : "http://"+this.state.imgurl
        return(
            <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
                    <img src={imgurl} id="itemimage" />
                    <Typography variant={"subtitle1"}  color={"textPrimary"} >名称</Typography>
                    <Typography variant={"p"} color={"textSecondary"} >{this.state.name}</Typography>
                    <Typography variant={"subtitle1"} color={"textPrimary"} >发行日期</Typography>
                    <Typography variant={"p"} color={"textSecondary"} >{this.state.date.split("T")[0]}</Typography>
                    <Typography variant={"subtitle1"} color={"textPrimary"} >作者</Typography>
                    <Typography variant={"p"} color={"textSecondary"} >{this.state.author}</Typography>
                    <Typography variant={"subtitle1"} color={"textPrimary"} >章节数</Typography>
                    <Typography variant={"p"} color={"textSecondary"} >{this.state.pages}</Typography>
            </Grid>
        )
    }
}
export default Item;
