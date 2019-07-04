import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from './navigation';
import Item from './item';
import Progressmanage from "./progressmanage";
import Commentlist from "./commentlist";

const useStyles = makeStyles(theme => ({
    root:{
        maxWidth: 300,
    }
}));

class ItemInfoPage extends Component {
    render(){
        return(
            <Grid container spacing={10}>
                <Grid> <Navigation /> </Grid>
                <Grid container spacing={2} direction={"row"}>
                    <Grid className={useStyles.root} item xs={6} >
                        <Item />
                    </Grid>
                    <Grid className={useStyles.root} xs={12} direction={"column"}>
                        <Progressmanage />
                    </Grid>
                    <Grid className={useStyles.root} item xs={6} >
                        <Commentlist />
                    </Grid>
                </Grid>
                </Grid>
        );
    }
}

export default ItemInfoPage;