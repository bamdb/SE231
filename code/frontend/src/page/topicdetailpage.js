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
import TopItemList from "../component/topitemlist";

class Topicdetailpage extends Component{
    constructor(props){
        super(props);
        this.state = {topic:[],data:[],search:"",rankitem:[]}
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }


    componentWillMount() {
        if(localStorage.getItem("userid") == null)
            window.location.href="/login";

        if(window.location.href.split("/")[3]!==undefined)
        {
            var id = window.location.href.split("/")[4];
            console.log(id);
            var url="https://api.bamdb.cn/topic/id/"+id;
        }

        axios.get("https://api.bamdb.cn/rating/browser",{params:{

                type:0,
                page:0,
                pageSize:10
            }}).then(
            function(response)
            {
                this.setState({rankitem:response.data});
            }.bind(this)
        )

        /*axios.get("/topic/all")
            .then(function (res) {
                this.setState({topic: res.data});
            }.bind(this)
            )*/


        axios.get("https://api.bamdb.cn/topic/id/"+id,{headers:{"Cache-Control": "no-cache"}})
            .then(function (res) {
                this.setState({data: res.data});
            }.bind(this)
            )
    }

    render(){
        const topic = this.state.topic;
        const data = this.state.data;

        return(
          <Grid container spacing={10} justify={"space-around"}>

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
                  <TopItemList itemList={this.state.rankitem}/>
              </Grid>
          </Grid>
        );
    }
}

export default Topicdetailpage;
