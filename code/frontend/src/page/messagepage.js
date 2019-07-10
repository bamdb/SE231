import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Userinfo from "../component/userinfo";
import Commentlist from "../component/commentlist";
import Listitem from '../component/listitem'
import Progressmanage from "../component/progressmanage";
import Login from "../component/login"
import Messagelist from "../component/messagelist";

class Messagepage extends Component{
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
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <Messagelist></Messagelist>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default Messagepage;