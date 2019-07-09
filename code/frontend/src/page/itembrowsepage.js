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
            isloaded: false,

        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e, newvalue)
    {
        this.setState({value:newvalue})
    }

    componentDidMount() {
        const _this = this;
        axios.get(
            "http://202.120.40.8:30741/item/all"
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
        return(

            <Grid container direction={"column"} >
                <Grid item xs={12}><Navigation/></Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                            <Tabs  value={this.state.value} onChange={this.handleChange}>
                                <Tab label="全部" />
                                <Tab label="书籍" />
                                <Tab label="视频" />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Tag select={true} tags={["热血","王道"]}/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7} >
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Listitem itemList={this.state.ItemList} ></Listitem>
                        <br/>
                        <Pagetable></Pagetable>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Itembrowsepage;