import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Listitem from '../component/listitem'


class Itembrowsepage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(

            <Grid container direction={"column"} spacing={2} >
                <Grid item xs={12}><Navigation/></Grid>
                <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                        <Tag select={true} tags={["热血","王道"]}/>
                    </Grid>
                    <Grid item xs={8} >
                        <Listitem></Listitem>
                    </Grid>
                    <Grid item xs={2}>
                        <br/><br/><br/><br/>
                        <TopItemList />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Itembrowsepage;