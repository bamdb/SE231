import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
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
            <Paper className={useStyles.root}>
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textSecondary"
                                >
                                    {this.props.date}  -  #{this.props.floor}
                                </Typography>
                                <br/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    {this.props.discuss}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textSecondary"
                                >
                                    {this.props.date}  -  #{this.props.floor}
                                </Typography>
                                <br/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                                    "gingacross all continents except Antarctica"
                                    {this.props.discuss}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textSecondary"
                                >
                                    {this.props.date}  -  #{this.props.floor}
                                </Typography>
                                <br/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                                    "gingacross all continents except Antarctica"
                                    {this.props.discuss}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            </Paper>
        );
    }
}

export default Discuss;