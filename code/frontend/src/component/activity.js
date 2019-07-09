/* 图片 未完成 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
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
* props.date : 用户收藏时间
* props.status : 对条目的新收藏状态（如 看过）
* props.grade : 用户评分
* props.comment : 用户简评
* props.itemname : 条目名
*/
class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            username: this.props.username,
            date: this.props.date,
            actType: this.props.actType,
            itemId: this.props.itemId,
            itemname: this.props.itemname,
            comment:this.props.comment,
            grade:0,
            loadItemName: false,
            loadComment: false,
            loadGrade: false,
            status: "",
        }

    }
/*
    static defaultProps = {
        username : "用户名",
        date : "2000-1-1",
        grade : "null",
        comment : "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging\n" +
            "                                    across all continents except Antarctica",
        status : "看过",
        itemname : "条目名"
    };

 */

    componentDidMount() {
        
        switch (Number(this.state.actType)) {
            case 0:
                this.setState({
                    status:"未收藏"
                });
                break;
            case 1:
                this.setState({
                    status:"想看"
                });
                break;
            case 2:
                this.setState({
                    status:"在看"
                });
                break;
            case 3:
                this.setState({
                    status:"看过"
                });
                break;
            case 4:
                this.setState({
                    status:"搁置"
                });
                break;
            case 5:
                this.setState({
                    status:"抛弃"
                });
                break;
            default:
                this.setState({
                    status:"Status出错"
                });
                break;
        }
        /* 获得item中itemname */

        const _this=this;
        axios.get("http://202.120.40.8:30741/item/id/"+_this.state.itemId)
            .then(function (res) {
                _this.setState({
                    itemname: res.data.itemname,
                    loadItemName: true,
                })
            })
            .catch(function (error) {
            })

        /* 获得grade */
        axios.get("http://202.120.40.8:30741/rating/itemid/"+_this.state.itemId)
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

        return(
            <Container fixed className={useStyles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={2} justify="center">
                        <br/>
                        <Avatar alt="Remy Sharp" src="img/3.jpg" className={useStyles.avatar} />
                        <br/>
                        <Typography variant="h5" component="h2">
                            {this.state.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} justify="center">
                        <Card className={useStyles.card}>
                            <Grid container >
                                <Grid item xs={9} justify="center">
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            在 {this.state.date}
                                        </Typography>
                                        <Grid container >
                                            <Grid item xs={6}>
                                                <Typography variant="h6" color={"textPrimary"} component={Link} to={"/useriteminfopage/"+this.state.itemname}>
                                                    {this.state.itemname + " " }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle1" color={"textSecondary"}>
                                                    {this.state.status}
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