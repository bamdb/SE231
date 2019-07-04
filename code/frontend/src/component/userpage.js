import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from "./navigation";
import TopItemList from "./topitemlist";
import Browserlist from "./browserlist";
import Tag from "./tag";
import Userinfo from "./userinfo";
import Commentlist from "./commentlist";


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

class UserPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid container direction={"column"} spacing={12} >
                <Grid> <Navigation /> </Grid>
                <Grid container direction={"row"} alignItems={"center"} spacing={2}>
                    <br />
                    <Grid item xs={2}>
                        <Tag />
                    </Grid>
                    <Grid item  >
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Commentlist />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default UserPage;