/*
 * 讨论区，参考知乎微博热评榜
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import TopicList from "../component/topiclist";
import Tag from "../component/tag";
import Typography from "@material-ui/core/Typography";
import Navigation from "../component/navigation";

class Topicpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hotTopics: [],       //热门话题，详细的话题信息，以卡片样子呈现在屏幕中部
            tags: [],            //热门标签，，可以分类，topic可以按此筛选
            relatedTopics: [],   //与用户爱好相关Topic
            isloaded: false,
        };
    }

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