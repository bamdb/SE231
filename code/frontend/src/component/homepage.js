import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from "./navigation";
import TopItemList from "./topitemlist";
import Progressmanage from './progressmanage'



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
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>

                        <Progressmanage />
                    </Grid>
                    <Grid item xs={2}>

                        <TopItemList />
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default HomePage;