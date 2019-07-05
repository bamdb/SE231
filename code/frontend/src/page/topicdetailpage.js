/*
 * 点击单个评论区评论之后
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Navigation from '../component/navigation';
import Topic from "../component/topic";

class Topicdetailpage extends Component{
    render(){
        return(
          <Grid container xs={12} spacing={10}>
              <Grid item>
                  <Navigation />
              </Grid>
              <Grid item>
                  <br/><br/><br/>
                  <Topic />
              </Grid>
              <Grid>

              </Grid>
          </Grid>
        );
    }
}

export default Topicdetailpage;