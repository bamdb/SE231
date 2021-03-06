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
import Register from "../component/register"

class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }

    render(){
        return(
            <Grid container spacing={10} justify={"center"} alignContent={"center"}>
                <br/><br/>
                <Grid item xs={8}>
                    <Register></Register>
                </Grid>
            </Grid>
        )
    }
}

export  default RegisterPage;