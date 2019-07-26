import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import axios from 'axios';
import Userinfo from '../component/userinfo'
import CarouselItem from '../component/carousel';

class Userinfopage extends Component{
    constructor(props){
        super(props);
        this.state={
            imgurls:[]
        }

    }
    componentWillMount() {
        if(localStorage.getItem("username")!=null) {
            var imgurls=[];
            axios.get("http://202.120.40.8:30741/rating/browser", {
                params: {
                    type: 0,
                    page: 0,
                    pageSize: 2
                }
            })
                .then(function (response) {
                    if (response != null) {
                        imgurls.push(response.data[0].item.imgurl);
                        imgurls.push(response.data[1].item.imgurl);
                    }
                })
            axios.get("http://202.120.40.8:30741/rating/browser", {
                params: {
                    type: 1,
                    page: 0,
                    pageSize: 2
                }
            })
                .then(function (response) {
                    if(response!=null) {
                        imgurls.push(response.data[0].item.imgurl);
                        imgurls.push(response.data[1].item.imgurl);
                    }
                })

            this.setState({
                imgurls: imgurls
            })
        }
        else {
            window.location.href="/#/login";
        }
    }

    render(){
        return(
            <Grid container spacing={10} justify={"center"} alignContent={"center"} direction={"column"}>
                <Grid item xs={8}>
                    <Userinfo></Userinfo>
                </Grid>
                <Grid item xs={8}>
                    <CarouselItem imgurls={this.state.imgurls}/>
                </Grid>
            </Grid>
        )
    }
}

export  default Userinfopage;