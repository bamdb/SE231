/*
 * 讨论区，参考知乎微博热评榜
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TopicList from "../component/topiclist";
import Tag from "../component/tag";
import Typography from "@material-ui/core/Typography";
import Navigation from "../component/navigation";

class Topicpage extends Component{
    render(){
        return(
            <Grid container direction={"row"} spacing={3} >
                <Grid item xs={12} spacing={3} ><Navigation /> </Grid>

                <Grid item xs={1} > </Grid>
                <Grid item xs={6} ><br/> <br/>
                    <Grid item>
                        <Typography variant={"h6"} component={"h6"} align={"left"} >讨论版</Typography>
                    </Grid>
                    <TopicList />
                </Grid>
                <Grid item xs={4} direction={"column"} spacing={3} ><br/> <br/>
                    <Tag />
                    <TopicList />
                </Grid>
            </Grid>
        );
    }
}

export default Topicpage;