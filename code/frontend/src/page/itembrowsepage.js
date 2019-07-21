import React, { Component } from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tags from "../component/tag";
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
            ItemList: [],
            tags: [],
            isloaded: false,
            search:"",
            currentpage:0,
            type:0,

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
        var value=window.location.href.split("#")[1].split("/")[2];
        var type = 0;
        switch(value)
        {
            case "book":type=0;break;
            case "movie": type=1;break;
        }
        this.setState({type:type})

        var currentpage=this.state.currentpage;
        axios.get(
            "/rating/browser",{params:{
                    type:type,
                    page:currentpage,
                    pageSize:8
                }}
        )
        .then(function (response) {
            _this.setState(
                {
                    ItemList: response.data,
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
        const ItemList= this.state.ItemList;
        return(
            <Grid container direction={"column"}>
                <Grid item xs={12}>
                <Grid container direction={"column"} >
                    <Grid item xs={12}>
                        <Tags select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]}/>
                    </Grid>
                    <Grid item xs={12} style={{padding:20}}>
                        <Grid container spacing={2}>
                                <Listitem ItemList={this.state.ItemList} search={this.state.search} handlepagechange={this.handlepagechange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} />
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