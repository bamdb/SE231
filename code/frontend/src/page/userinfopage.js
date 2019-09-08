import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index'
import axios from 'axios';
import Userinfo from '../component/userinfo'
import CarouselItem from '../component/carousel';

class Userinfopage extends Component{
    constructor(props){
        super(props);
        this.state={
        }

    }
    componentWillMount() {
        if(localStorage.getItem("username")!=null) {
        }
        else {
            window.location.href="/login";
        }
    }

    render(){
        return(
            <Grid container spacing={10} justify={"center"} alignContent={"center"}>
                <Grid item xs={8}>
                    <Userinfo></Userinfo>
                </Grid>
            </Grid>
        )
    }
}

export  default Userinfopage;
