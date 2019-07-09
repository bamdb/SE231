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

class Topicdetailpage extends Component{
    constructor(props){
        super(props);
        this.state = {data:[]}

    }


    componentWillMount() {
        var uri=window.location.href;
        var id=uri.split('#')[1].split('/')[2];

        var url="http://202.120.40.8:30741/item/id/"+id;
    }

    render(){
        return(
          <Grid container spacing={10}>
              <Grid item xs={12}>
                  <Navigation />
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={8}>
                  <Grid>
                      <Topic />
                  </Grid>
                  <Grid>
                      <Discuss />
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