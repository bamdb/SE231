/*
 * 单个topic下讨论区
 * 用户头像
 * username
 * date floor
 * content
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


/*
* 需要传入的props(需要以列表形式传入，通过map渲染到每个listItem当中)
* props.username : 用户名
* props.date : 用户发表讨论时间
* props.discuss : 用户发表讨论内容
* props.floor : 当前讨论层数
*/
class Discuss extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        username : "null",
        date : "2000-1-1",
        floor : "null",
        discuss : "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
            "gingacross all continents except Antarctica"
    };

    render() {
        return(
            <Grid container >
            <Paper className={useStyles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                <Grid item xs={11}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >{this.props.username}</Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        {this.props.date}  -  #{this.props.floor}
                    </Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textPrimary"
                    >
                        {this.props.discuss}
                    </Typography>
                </Grid>
                </Grid>
                <Divider variant="inset" component="li" /><Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >{this.props.username}</Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        {this.props.date}  -  #{this.props.floor}
                    </Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textPrimary"
                    >
                        {this.props.discuss}
                    </Typography>
                </Grid>
            </Grid>
                <Divider variant="inset" component="li" />
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >{this.props.username}</Typography>
                        <Typography
                            component="p"
                            variant="subtitle1"
                            color="textSecondary"
                        >
                            {this.props.date}  -  #{this.props.floor}
                        </Typography>
                        <Typography
                            component="p"
                            variant="subtitle1"
                            color="textPrimary"
                        >
                            {this.props.discuss}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        );
    }
}

export default Discuss;