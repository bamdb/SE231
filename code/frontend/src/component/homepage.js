import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from "./navigation";
import TopItemList from "./topitemlist";
import Browserlist from "./browserlist";


const useStyles = makeStyles(theme => ({
    root:{
        width: "20%",
    }
}));
/*
class TopPart extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid container className={useStyles.root} >
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
            </Grid>
        )
    }
}
 */

class HomePage extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid container >
                <Grid> <Navigation /> </Grid>
                <Grid container direction={"row"} >
                    <Grid className={useStyles.root}>
                        <TopItemList />
                    </Grid>
                    <Grid>
                        <Browserlist />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default HomePage;