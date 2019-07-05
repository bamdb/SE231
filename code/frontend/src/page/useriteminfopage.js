/*
 * 显示用户单个条目的阅读进度与书评
 */

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

import Navigation from '../component/navigation';
import Item from '../component/item';
import Progressmanage from "../component/progressmanage";
import Commentlist from "../component/commentlist";



class Useriteminfopage extends Component {
    render(){
        return(
            <Grid container spacing={10}>
                <Grid item xs={12}><Navigation/></Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        <Grid item xs={1}></Grid>
                        <Grid  item xs={1} >
                            <Item />
                        </Grid>

                        <Grid  item xs={7} >
                            <Progressmanage />
                        </Grid>
                        <Grid  item xs={3} >
                            <Commentlist />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Useriteminfopage;