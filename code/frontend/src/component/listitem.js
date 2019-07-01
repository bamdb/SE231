import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Modal} from "antd";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
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
    }

    static defaultProps = {
        name:"三体",date:"2000-1-1",author:"Liu Cixin",chapter:12,score:"8.0",rank:10
    };

    render() {
        return(
            <Paper className={useStyles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h3">
                            {this.props.name}
                        </Typography>
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography component="p" align="center">
                                    {this.props.date}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component="p" align="center">
                                    {this.props.author}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component="p" align="center">
                                    {this.props.chapter}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="h5" component="h3" align="center">
                                    评分
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={useStyles.paper}>
                                    <Typography variant="h5" component="h3" align="center">
                                        {this.props.score}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h5" component="h3" align="center">
                                    排名
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={useStyles.paper}>
                                    <Typography variant="h5" component="h3" align="center">
                                        {this.props.rank}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Listitem;