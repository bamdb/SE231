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
            currentpage:0,
            ItemList: [],
            tags: [],
            isloaded: false,
            search:"",
            type:0,

        };

        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlepagechange=this.handlepagechange.bind(this);
    }

    handlepagechange(currentpage)
    {
        console.log(currentpage);
        this.setState({currentpage:currentpage});
    }

    handleSearch(value){
        this.setState({search:value});
    }

    handletagchange(tags){
        this.setState({tags:tags});
    }

    componentWillMount() {
        var value=window.location.href.split("#")[1].split("/")[2];
        var type = 0;
        switch(value)
        {
            case "book":type=0;break;
            case "movie": type=1;break;
            case "flash": type=2;break;
        }
        this.setState({type:type})

    }

    render(){
        return(
            <Grid container>
                <Grid item xs={12} style={{padding:20}}>
                        <Tags select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]}/>
                        <Listitem currentpage={this.state.currentpage} type={this.state.type} search={this.state.search} handlepagechange={this.handlepagechange}/>
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