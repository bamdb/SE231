/*
 * 讨论区，参考知乎微博热评榜
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TopicList from "../component/topiclist";
import Tags from "../component/tag";
import Typography from "@material-ui/core/Typography";
import Navigation from "../component/navigation";
import axios from "axios";
import PropTypes from "prop-types";
import Addtopic from "../component/addtopic";
class Topicpage extends Component{

    constructor(props)
    {
        super(props);
        this.state={tags:[],topics:[]};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){
        this.setState({search:value});
    }

    handletagchange(tags){
        this.setState({tags:tags});

    }
    componentWillMount() {
        axios.get("/topic/all").then(
            function (response){

            this.setState({topics:response.data});
        }.bind(this)
        )
    }

    render(){
        return(
            <Grid container direction={"row"} spacing={4} >
                <Grid item xs={2} >
                    <br/>
                    <Tags select={true} tagchange={this.handletagchange} /></Grid>
                <Grid item xs={8} >
                    <Typography variant={"h6"} component={"h6"} align={"left"} >讨论版</Typography>
                    <Grid container spacing={0}>
                    <TopicList  search={this.state.search} topics={this.state.topics}/>
                    </Grid>
                </Grid>
                <Grid item xs={2}><Addtopic /></Grid>
            </Grid>
        );
    }
}

export default Topicpage;