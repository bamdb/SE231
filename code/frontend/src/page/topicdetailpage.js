/*
 * 点击单个评论区评论之后
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Navigation from '../component/navigation';
import Topic from "../component/topic";
import Discuss from "../component/discuss";
import Reply from "../component/reply";
import Relateditem from "../component/relatedlist";
import axios from 'axios';
import TopicList from "../component/topiclist";

class Topicdetailpage extends Component{
    constructor(props){
        super(props);
        this.state = {topic:[],data:[],search:""}
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }


    componentWillMount() {
        if(window.location.href.split("#")[1]!==undefined)
        {
            var id = window.location.href.split("#")[1].split("/")[2];
            console.log(id);
            var url="http://202.120.40.8:30741/topic/id/"+id;
        }

        /*axios.get("/topic/all")
            .then(function (res) {
                this.setState({topic: res.data});
            }.bind(this)
            )*/


        axios.get("http://202.120.40.8:30741/topic/id/"+id)
            .then(function (res) {
                this.setState({data: res.data});
            }.bind(this)
            )
    }

    render(){
        const topic = this.state.topic;
        const data = this.state.data;
        return(
          <Grid container spacing={10}>

              <Grid item xs={1}>
              </Grid>
              <Grid item xs={8}>

                  <Grid>
                      <Discuss replies={data.replyList}/>
                  </Grid>
                  <Grid>
                      <br/>
                      <Reply />
                  </Grid>
              </Grid>
              <Grid item xs={3}>
                  <Relateditem />
              </Grid>
          </Grid>
        );
    }
}

export default Topicdetailpage;