import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Listitem from '../component/listitem'
import {AppBar} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Pagetable from "../component/pagetable";
import axios from 'axios';



class Itembrowsepage extends Component{
    constructor(props){
        super(props);
        this.state={
            ItemList: [],
            tags: [],
            isloaded: false,
            search:"",
            currentpage:0,
            value:0

        };
        this.handleChange=this.handleChange.bind(this);
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlepagechange=this.handlepagechange.bind(this);
        this.loaddata=this.loaddata.bind(this);
    }
    loaddata()
    {

    }
    handlepagechange(currentpage)
    {
        this.setState({currentpage:currentpage});
    }

    handleSearch(value){
        this.setState({search:value});
        console.log("搜索框内容："+value);
    }

    handletagchange(tags){
        this.setState({tags:tags});
    }

    handleChange(e, newvalue)
    {
        this.setState({value:newvalue})
    }

    componentWillMount() {
        const _this = this;
        var type=this.state.value;
        var currentpage=this.state.currentpage;
        axios.get(
            "http://202.120.40.8:30741/rating/browser",{params:{
                    type:type,
                    page:currentpage,
                    pageSize:3
                }}
        )
            .then(function (response) {
                _this.setState(
                    {
                        ItemList: response.data,
                        isloaded: true,
                    }
                );
            })
            .catch(function (error) {
                _this.setState({
                })
            })
    }

    render(){
        const ItemList= this.state.ItemList;
        return(
            <Grid container direction={"column"} >
                <Grid item xs={12}><Navigation handleSearch={this.handleSearch}/></Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={11}>
                            <Tabs  value={this.state.value} onChange={this.handleChange}>

                                <Tab label="书籍" />
                                <Tab label="视频" />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                <Grid container direction={"row"} >
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <br/><br/>
                        <Tag select={true} tagchange={this.handletagchange} tags={["热血","王道"]}/>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={7} >
                        <br/>
                        <br/>
                        <Listitem ItemList={ItemList} search={this.state.search}/>
                        <br/>
                        <Pagetable handlepagechange={this.handlepagechange}/>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Itembrowsepage;