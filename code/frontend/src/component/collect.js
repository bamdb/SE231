import React, { Component } from 'react';
import { Bar as BarChart } from 'react-chartjs';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {LinearProgress} from "@material-ui/core";
import Collectform from "./collectform";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 2),
        width: 30
    },
    card: {
        maxWidth: 345,
    },
    board: {
        height: 1,
        border: 0,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

/* 
* 需要传入的props（包装成json后可以简化）
* props.status : 用户的收藏状态 （如 "在看"）
* props.comment : 用户对条目的评论 (一段用户在收藏时写下的评论，可能需要字数限制)
* props.total : 条目总章节数 (如 12)
* props.completed : 用户完成章节数 （如 6）
* props.grade : 用户评分 (如 7)
* props.totGrade : 所有用户评分分布 （如 [65, 59, 80, 81, 56, 55, 40, 0, 0, 0]）
* props.avgGrade : 所有用户评分均分 （如 8.3999）
* props.rank : 评分均分在同类作品里的总排名 （如 12）
*/
class Collect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            completed: 0,
            comment:{},
            score:0,
            userid:1
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    componentWillMount() {

        axios.get("http://202.120.40.8:30741/comment",{params:{itemId:this.props.itemid,userId:this.props.userid}}).then(
            function(response)
            {
                this.setState({comment:response.data});
            }.bind(this)
        )
        axios.get("http://202.120.40.8:30741/rating/score",{params:{itemId:this.props.itemid,userId:this.props.userid}}).then(
            function(response)
            {
                this.setState({score:response.data.score});
            }.bind(this)
        )

    }
    componentWillReceiveProps(nextProps, nextContext) {
        axios.get("http://202.120.40.8:30741/comment",{params:{itemId:this.props.itemid,userId:nextProps.userid}}).then(
            function(response)
            {
                this.setState({comment:response.data});
            }.bind(this)
        )
        axios.get("http://202.120.40.8:30741/rating/score",{params:{itemId:this.props.itemid,userId:nextProps.userid}}).then(
            function(response)
            {
                this.setState({score:response.data.score});
            }.bind(this)
        )
    }


    static defaultProps = {
        status : "未收藏",
        comment : "未评论",
        total : 0,
        completed : 0,
        grade : "未评分",
        totGrade : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        avgGrade : "暂无",
        rank : "暂无"
    };

    handleExpandClick() {
        this.setState({expanded : !this.state.expanded});
    }

    render() {
        const data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [{
                label: 'Grade dataset',
                borderWidth: 0.3,
                data: this.props.totGrade,
            }],
        };
        const options = {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                }],
            },
        };
        return(
            <Card className={useStyles.card}>
                <CardHeader
                    title={"收藏盒"}
                    subheader={"我" + this.props.status + "这部作品"}
                />
                <hr className={useStyles.board} color="#C7C7C7"/>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                我的评分
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={useStyles.paper}>
                                <Typography variant="h5" component="h3" align="center">
                                    {this.state.score}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        我的评论
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.state.comment.content}
                    </Typography>
                </CardContent>
                <hr className={useStyles.board} color="#C7C7C7"/>
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        我的完成度:{this.props.completed}/{this.props.total}
                    </Typography>
                    <LinearProgress variant="determinate" value={this.props.completed * 100 / this.props.total}/>
                </CardContent>
                <hr className={useStyles.board} color="#C7C7C7"/>
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        评分与排名
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                评分
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={useStyles.paper}>
                                <Typography variant="h5" component="h3" align="center">
                                    {this.props.avgGrade}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                排名
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={useStyles.paper}>
                                <Typography variant="h5" component="h3" align="center">
                                    {this.props.rank}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        评分人数分布
                    </Typography>

                    <BarChart data={data} options={options} width="600" height="250" />
                </CardContent>
                <CardActions disableSpacing>
                    <Collectform itemid={this.props.itemid}/>
                    <IconButton aria-label="Share">
                        分享
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(useStyles.expand, {
                            [useStyles.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        更多功能
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>个性化推荐</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }

}

export default Collect;