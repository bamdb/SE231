import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import  '../css/navigate.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
/*function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};*/

/*function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}*/

/*const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height:100
    },
}));*/

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : 0
        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        var x=window.location.href.split("#")[1].split("/")[1];
        console.log(x);
        switch (x)
        {
            case "homepage" :this.setState({value:0});break;
            case "itembrowsepage" :this.setState({value:1});break;
            case "useriteminfopage" :this.setState({value:2});break;
            case "userfavoritepage" :this.setState({value:3});break;
            case "topicpage" :this.setState({value:4});break;
        }
    }

    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }

    render() {
        return (

            <div id={"navigateroot"}>
                <AppBar color={"default"} position={"fixed"} id={"navigateroot"}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>

                                <Grid item xs={10}>
                            <Tabs centered={true} value={this.state.value} onChange={this.handleChange}>
                                <Tab label="首页" href={"/#/"}/>
                                <Tab label="浏览" href={"/#/itembrowsepage"}/>
                                <Tab label="进度" href={"/#/useriteminfopage"}/>
                                <Tab label="收藏" href={"/#/userfavoritepage"}/>
                                <Tab label="讨论区" href={"/#/topicpage"}/>
                            </Tabs>
                                </Grid>
                                <Grid item xs={2}>
                                <br/>
                                    <Button href={"/#/loginpage"} color={"primary"} variant="contained">登录</Button>
                                    <Button href={"/#/registerpage"} color={"primary"} variant="contained">注册</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    <InputBase
                                        placeholder="Search…"
                                        />
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </AppBar>
                <br/>
                <br/>


            </div>
        );
    }

}

export default Navigation;