/*
 * 用户动态
 * 渲染某一用户对单个item的收藏状态
 * eg. id为1的用户想看评分为7.12766的《三体》
 *
 * 图片调取渲染 未完成
 *
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth : 300,
    },
    avatar: {
        marginTop : 20,
        margin: 10,
    },
    card: {
        borderRadius: 10,
        borderSize: 3,
        maxWidth: 50
    }
});


/*
* 需要传入的props（包装成json后可以简化）
* props.username : 用户名
* props.userId : 用户id
* props.date : 用户收藏时间
* props.actType : 对条目的新收藏状态（int类型）
* props.itemId : 条目id
*
*/
class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemname:"",
            comment:this.props.comment,
            grade:0,
            loadItemName: false,
            loadComment: false,
            loadGrade: false,
        }
    }

    componentDidMount() {
        /* 获得item中itemname */
        const _this=this;
        axios.get("http://202.120.40.8:30741/item/id/"+this.props.itemId)
            .then(function (res) {
                _this.setState({
                    itemname: res.data.itemname,
                    loadItemName: true,
                })
            })
            .catch(function (error) {
            })

        /* 获得grade */
        axios.get("http://202.120.40.8:30741/rating/itemid/"+this.props.itemId)
            .then(function (res) {
                _this.setState({
                    grade: res.data.avgScore,
                    loadGrade: true,
                })
            })
            .catch(function (error) {

            })
        /* 获得comment */
        /*       axios.get("http://202.120.40.8:30741/comment/",
                           _this.state.itemid,
                           _this.state.userid
                           )
                   .then(function (res) {
                       _this.setState({
                           comment: res.data.content,
                           loadComment: true,
                       })
                   })
                   .catch(function (error) {

                   })
       */

    }


    render() {
        var status;
        switch (Number(this.props.actType)) {
            case 0:
                status="未收藏";
                break;
            case 1:
                status="想看";
                break;
            case 2:
                status="在看";
                break;
            case 3:
                status="看过";
                break;
            case 4:
                status="搁置";
                break;
            case 5:
                status="抛弃";
                break;
            default:
                status="Status出错";
                break;
        }
        var time="2019-7-1"
        if(this.props.date!=undefined)
        {
            time=this.props.date.split("T")[0];
        }

        return(
            <Container fixed className={useStyles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={2} justify="center">
                        <br/>
                        <Avatar alt="Remy Sharp" src="img/3.jpg" className={useStyles.avatar} />
                        <br/>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} justify="center">
                        <Card className={useStyles.card}>
                            <Grid container >
                                <Grid item xs={9} justify="center">
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            在 {time}
                                        </Typography>
                                        <Grid container >
                                            <Grid item xs={6}>
                                                <Typography variant="h6" color={"textPrimary"} component={Link} to={"/useriteminfopage/"+this.props.itemId}>
                                                    {this.state.itemname + " " }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle1" color={"textSecondary"}>
                                                    {status}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                    <CardContent>
                                        <Grid container spacing={0}>
                                            <Grid item xs={2}>
                                                <Typography variant="subtitle1" color="textPrimary" component="p">
                                                    评分
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="h5" component="h3" align="center">
                                                    {this.state.grade}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="subtitle1" color="textPrimary" component="p">
                                            评论
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.state.comment}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={3} justify="center">
                                    <br/><br/>
                                    <img src="img/3.jpg" alt="暂无图片" className={useStyles.image} height="120px" width="96px"/>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        );
    }

}

export default Activity;