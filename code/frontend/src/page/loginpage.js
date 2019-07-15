import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import '../css/login.css';
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

const useStyles = makeStyles({
    root: {
        height: '100vh',
        backgroundImage: 'url(/img/3.jpg)',
    },
})

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }

    render(){
        return(
            <div id={"login"} >
                <Grid container className={useStyles.root} >
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={5}>
                        <br/><br/><br/>
                        <br/><br/><br/>
                        <Login></Login>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export  default LoginPage;