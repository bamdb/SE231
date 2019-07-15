import React, { Component } from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles/index';
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
import {blueGrey, grey} from "@material-ui/core/colors";


class Itembrowsepage extends Component{
    constructor(props){
        super(props);
        this.state={
            ItemList1: [],
            ItemList2: [],
            tags: [],
            isloaded: false,
            search:"",
            currentpage0:0,
            currentpage1:0

        };
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlepagechange=this.handlepagechange.bind(this);
    }

    handlepagechange(currentpage)
    {
        this.setState({currentpage:currentpage});
    }

    handleSearch(value){
        this.setState({search:value});
    }

    handletagchange(tags){
        this.setState({tags:tags});
    }

    componentWillMount() {
        const _this = this;
        var currentpage0=this.state.currentpage0;
        var currentpage1=this.state.currentpage1;
        axios.get(
            "http://202.120.40.8:30741/browser",{params:{
                    type:0,
                    page:currentpage0,
                    pageSize:4,
                }}
        )
        .then(function (response) {
            _this.setState(
                {
                    ItemList0: response.data,
                    isloaded: true,
                }
            );
            console.log(response.data);
        })
        .catch(function (error) {
            _this.setState({
            })
        })
        axios.get(
            "http://202.120.40.8:30741/rating/browser",{params:{
                    type:1,
                    page:currentpage1,
                    pageSize:3
                }}
        )
            .then(function (response) {
                _this.setState(
                    {
                        ItemList1: response.data,
                        isloaded: true,
                    }
                );
                console.log(response.data);
            })
            .catch(function (error) {
                _this.setState({
                })
            })
    }

    render(){
        const ItemList0= this.state.ItemList0;
        const ItemList1= this.state.ItemList1;
        return(

            <Grid container direction={"column"}>
                <Grid item xs={12}><Navigation handleSearch={this.handleSearch}/></Grid>
                <Grid item xs={12}>
                <Grid container direction={"column"} >
                    <br/>
                    <Grid item xs={12}>
                        <Tag select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Listitem ItemList={ItemList0} search={this.state.search}/>
                                <Pagetable handlepagechange={this.handlepagechange}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Listitem ItemList={ItemList1} search={this.state.search}/>
                                <Pagetable handlepagechange={this.handlepagechange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Itembrowsepage
/*
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
                </Grid>;
 */