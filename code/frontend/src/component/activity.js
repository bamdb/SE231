import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
    }

    static defaultProps = {
        username : "用户名",
        date : "2000-1-1",
        grade : "null",
        comment : "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging\n" +
            "                                    across all continents except Antarctica",
        status : "看过",
        itemname : "条目名"
    };

    render() {
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
                            <Grid container spacing={2}>
                                <Grid item xs={9} justify="center">
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            在 {this.props.date}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {this.props.status + " " + this.props.itemname}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <Typography variant="subtitle1" color="textPrimary" component="p">
                                                    评分
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Paper className={useStyles.paper}>
                                                    <Typography variant="h5" component="h3" align="center">
                                                        {this.props.grade}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="subtitle1" color="textPrimary" component="p">
                                            评论
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.props.comment}
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