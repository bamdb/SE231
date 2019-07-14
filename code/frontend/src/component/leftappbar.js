import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {blueGrey, brown, grey} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import {createMuiTheme} from '@material-ui/core/styles';
import { MuiThemeProvider} from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import {ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";

const theme = createMuiTheme({
    palette: {
        background: blueGrey[50],
        secondary: {
            main: grey[700],
            light:grey[100],
        },
    },
    shadows:0,
});

const useStyles = makeStyles({
    icon: {
        margin: theme.spacing(2),
    },
    avatar:{
        margin: 10,
        width: 60,
        height: 60,
    },
})

class LeftAppBar extends Component {
    constructor(props){
        super(props);
        this.state={username:"shenruien",password:"123456",email:"123456@qq.com",id:"1",date:"2019-7-1",grade:"1"};
    }
    componentDidMount() {

        axios({url: 'http://202.120.40.8:30741/user/id/1',method:'GET'})
            .then(
                function (response)
                {
                    console.log(response.data);
                    this.setState({username:response.data.username,password:response.data.password,email:response.data.mail})
                }.bind(this)
            )
    }

    render(){
        return(
            <MuiThemeProvider theme={theme} >
                <Paper square={true} elevation={10} style={{backgroundColor: theme.palette.background}}>
                    <Grid container spacing={2} direction={"column"} style={{height:600}} justify={"flex-start"} wrap={"nowrap"} >
                        <br/>
                        <br/>
                        <Grid item style={{paddingLeft:100}}>
                            <Grid container >
                                <Grid item xs={3} >
                                    <HomeOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{color:theme.palette.secondary.main}}>HOME</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{paddingLeft:100}}>
                            <Grid container >
                                <Grid item xs={3}>
                                    <MovieOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{color:theme.palette.secondary.main}}>MOVIE</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item style={{paddingLeft:100}}>
                            <Grid container >
                                <Grid item xs={3}>
                                    <BookOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{color:theme.palette.secondary.main}}>BOOK</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item style={{paddingLeft:100}}>
                            <Grid container >
                                <Grid item xs={3}>
                                    <PersonOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography style={{color:theme.palette.secondary.main}}>???</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction={"row"} style={{height:110}}>
                        <Grid item xs={3} alignItems={"flex-right"} >
                        <Avatar src="..\img.jpg" className={useStyles.avatar} />
                        </Grid>
                        <Grid item xs={9} >
                            <Typography variant={"subtitle1"} style={{color:theme.palette.secondary.main}} >{this.state.username}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default LeftAppBar;