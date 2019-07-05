import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

import Navigation from "./component/navigation";


import Tag from "./component/tag";


import Listitem from './component/listitem'



class EntryPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(

            <Grid container direction={"column"} spacing={12} >
                <Grid item xs={12}><Navigation/></Grid>
                <Grid container direction={"row"} alignItems={"center"} spacing={2}>

                    <Grid item xs={2}>
                        <Tag />
                    </Grid>
                    <Grid item xs={10} >
                        <br/>
                        <br/>
                        <br/>
                        <Listitem></Listitem>

                    </Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default EntryPage;