/*
 * 显示用户单个条目的阅读进度与书评
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from '../component/navigation';
import Item from '../component/item';
import Progressmanage from "../component/progressmanage";
import Commentlist from "../component/commentlist";

const useStyles = makeStyles(theme => ({
    root:{
        maxWidth: 300,
    }
}));

class Useriteminfopage extends Component {
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

export default Useriteminfopage;