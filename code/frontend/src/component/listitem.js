/*
 * score 未完成
 */

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Modal} from "antd";
import Collectform from "./collectform";
import '../css/listitem.css'
import axios from 'axios';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        minWidth: 800,
        width: '100%',
    },
    paper: {
        padding: theme.spacing(3, 2),
        width: 200
    },
    image: {
        height: 120,
        width: 96,
    },
    card: {
        maxWidth: 345,
        height:100
    },
}));

/*
* 需要传入的props（包装成json后可以简化）
* props.name : 条目标题
* props.date : 条目出版/播出日期
* props.author : 条目作者
* props.score : 条目评分
* props.rank : 条目排名
* props.chapter : 条目章节数 
*/
class Listitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemList:[
                {
                    item: {
                        id:1,
                        itemname:"ThreeBody",
                        pubTime: "2010-3-1T00",
                        mainAuthor:"liucixin",
                        chapterNum:3,
                    }
                }
            ]
        }
    }


    render() {

        var rows=[];
        const item = this.state.ItemList;
        if(item !== undefined)
        {
            for(var i=0; i<item.length; ++i) {
                if (item[i].item.itemname.indexOf(this.props.search) !== -1) {
                rows.push(
                    /*
                    <Card className={useStyle.card} style={{width:120}}>

                        <CardActionArea onClick={this.showEditBar}>
                            <CardMedia
                                style={{height:120}}
                                className={useStyle.media}
                                image={"img/3.jpg"}
                            />
                            <CardContent >
                                {this.state.itemname}

                     */
                    <Card className={useStyles.card} style={{width:120}}>
                        <CardActionArea onClick={this.showEditBar}>
                            <CardMedia
                                style={{height:80}}
                                className={useStyles.media}
                                image={"img/3.jpg"}
                            />
                            <CardContent >
                                <Typography component={Link} to={'/itemdetail/'+item[i].item.id} align="center">
                                    {item[i].item.itemname}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    /*
                                <br/>
                                <Paper className={useStyles.paper}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].item.pubTime.split("T")[0]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].item.mainAuthor}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="p" align="center">
                                                {item[i].item.chapterNum}
                                            </Typography>
                                        </Grid>
                                        </Grid>
                                </Paper>
                                <br/>
                                <Score id={item[i].item.id}/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={2}>
                                <br/>
                                <Collectform itemid={item[i].item.id}/>
                            </Grid>
                        </Grid>
                    </Card>
*/
                )
            }

            }
        }

        return(
            <div id={"mainlistitem"} >
                {rows}
            </div>
        );
    }
}

class Score extends Component{
    constructor(props){
        super(props);
        this.state = {data:[], isloaded:false}
    }
    componentWillMount() {
        const _this=this;
        axios.get("http://202.120.40.8:30741/rating/itemid/"+this.props.id)
            .then(function (res) {
                _this.setState({data: res.data, isloaded: true}
                );
            })
            .catch(function (error) {
            })
    }

    render(){
        return(
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Typography variant="h5" component="h3" align="center">
                    评分
                </Typography>
            </Grid>
            <Grid item xs={3}>
                    <Typography variant="h5" component="h3" align="center">
                        {this.state.data.avgScore}
                    </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5" component="h3" align="center">
                    排名
                </Typography>
            </Grid>
            <Grid item xs={3}>
                    <Typography variant="h5" component="h3" align="center">
                        {this.state.data.rank}
                    </Typography>
            </Grid>
        </Grid>
        );
    }


}

export default Listitem;