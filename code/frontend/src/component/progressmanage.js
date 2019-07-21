import React, { Component } from 'react';
 
import Paper from '@material-ui/core/Paper';
import { Button, Radio, Icon } from 'antd';
import '../css/progressmanage.css';
import Scheduletable from './scheduletable'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import axios from "axios"
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Progressmanage extends Component {
    constructor(props) {
        super(props);
        this.state={label:0};
        this.state={
            items:[
                {readstat:[0,[1,0,1,0],0,1],itemname:"book1",kind:"book"},
                {readstat:[1,1,1],itemname:"book2",kind:"movie"},
                {readstat:[1,1,1,1],itemname:"book3",kind:"movie"},
                {readstat:[1,1,1,1],itemname:"book3",kind:"movie"}
                ],
            value:0,
            uppage:0,
            downpage:0,
            data:[],
            book:[],
            movie:[],
            userid:this.props.userid,
        }
        this.handleChange=this.handleChange.bind(this);
        this.upleft=this.upleft.bind(this);
        this.downleft=this.downleft.bind(this);
        this.upright=this.upright.bind(this);
        this.downright=this.downright.bind(this);
    }

    upleft()
    {
        if(this.state.uppage>0)
        {
            this.setState({uppage:this.state.uppage-1});
        }
    }
    upright()
    {
        if(this.state.uppage*4+4<this.state.book.length)
        {
            this.setState({uppage:this.state.uppage+1});
        }
    }
    downleft()
    {
        if(this.state.downpage>0)
        {
            this.setState({downpage:this.state.downpage-1});
        }
    }
    downright()
    {
            if(this.state.downpage*4+4<this.state.movie.length)
            {
                this.setState({downpage:this.state.downpage+1});
            }
    }
    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }

    componentWillMount() {
        axios.get("http://202.120.40.8:30741/activity/userid/1",{params:
                {access_token: localStorage.getItem("access_token")}}).then(
            function(response)
            {
                var book=[];
                var movie=[];
                for(var i=0;i<response.data.length;++i)
                {
                    if(response.data[i].item.type==0)
                    {
                        book.push(response.data[i].item);
                    }
                    else
                    {
                        movie.push(response.data[i].item);
                    }
                }
                this.setState({book:book,movie:movie});
            }.bind(this)
        )
    }

    render() {
        var items1=[];
        var items2=[];
        for(var i=this.state.uppage*4;(i<this.state.uppage*4+4)&&i<this.state.book.length;++i)
        {
            items1.push(
                <Grid item xs={3}>
                    <Grid container >
                        <Scheduletable userid={this.state.userid} itemid={this.state.book[i].id} itemname={this.state.book[i].itemname} />
                    </Grid>
                </Grid>
            )
        }
        for(var i=this.state.downpage*4;i<(this.state.downpage*4+4)&&i<this.state.movie.length;++i)
        {
            items1.push(
                <Grid item xs={3}>
                    <Grid container >
                        <Scheduletable userid={this.state.userid} itemid={this.state.book[i].id} itemname={this.state.book[i].itemname}/>
                    </Grid>
                </Grid>
            )
        }

        return(
            <div>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >我的图书</Typography>
                <Divider />
                <br/>
                <Grid container>
                <Grid item xs={1}>
                    <br/>
                    <br/>
                    <br/>
                    <Button type="normal" shape={"circle"} size={"large"} onClick={this.upleft}>
                        <Icon type="left" />
                    </Button>
                </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={3}>
                            {items1}
                        </Grid>
                    </Grid>
                <Grid item xs={1}>
                    <br/>
                    <br/>
                    <br/>
                    <Button type="normal" shape={"circle"} size={"large"} onClick={this.upright}>
                        <Icon type="right" />
                    </Button>
                </Grid>
                </Grid>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >我的电影</Typography>
                <Divider />
                <br/>
                <Grid container>
                    <Grid item xs={1}>
                        <br/>
                        <br/>
                        <br/>
                        <Button type="normal" shape={"circle"} size={"large"} onClick={this.downleft}>
                            <Icon type="left" />
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={3}>
                            {items2}
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <br/>
                        <br/>
                        <br/>
                        <Button type="normal" shape={"circle"} size={"large"}onClick={this.downright}>
                            <Icon type="right" />
                        </Button>
                    </Grid>
                </Grid>
                <br/>
            </div>
        )
    }
}
export default Progressmanage;
