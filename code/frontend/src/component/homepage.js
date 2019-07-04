import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from "./navigation";


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
        height: 50,
    },
}));

class TopPart extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid container className={useStyles.root} >
                <Grid item xs={3}>
                    <Paper></Paper>/* image of "Bamdb" */
                </Grid>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={3}>
                    <Paper></Paper>
                </Grid>
            </Grid>
        )
    }
}

class HomePage extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <TopPart></TopPart>
        )
    }
}

export  default HomePage;