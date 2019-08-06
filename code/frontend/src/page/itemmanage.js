import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import '../css/login.css';



class Itemmanagepage extends Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }

    render(){
        return(
            <div id={"login"} >
                <Grid container  >
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={5}>
                        <br/><br/><br/>
                        <br/><br/><br/>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export  default Itemmanagepage;