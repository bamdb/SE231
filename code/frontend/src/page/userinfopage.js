import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Progressmanage from '../component/progressmanage'
import Userinfo from '../component/userinfo'


/*
class TopPart extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid container className={useStyles.root} >
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
            </Grid>
        )
    }
}
 */

class Userinfopage extends Component{
    constructor(props){
        super(props);

        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }
    componentWillMount() {
        console.log(localStorage.getItem("username"));
        if(localStorage.getItem("userid")===null)
        {
            window.location.href="/#/login";
        }
    }

    render(){
        return(
            <Grid container spacing={10}>

                <Grid item xs={12}>
                    <Grid container spacing={3} >
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8}>

                            <Userinfo></Userinfo>
                            <br/>
                            <br/>
                            <Progressmanage></Progressmanage>
                        </Grid>
                        <Grid item xs={2}>


                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default Userinfopage;