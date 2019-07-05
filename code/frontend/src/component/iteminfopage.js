import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

import Navigation from './navigation';
import Item from './item';
import Progressmanage from "./progressmanage";
import Commentlist from "./commentlist";



class ItemInfoPage extends Component {
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

export default ItemInfoPage;