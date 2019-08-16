import React, { Component } from 'react';
import '../index.css';
import Grid from '@material-ui/core/Grid/index'
import TopItemList from "../component/topitemlist";
import Progressmanage from '../component/progressmanage';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';


class Userhomepage extends Component{

    constructor(props){
        super(props);
        this.state={rankitem:[], userid:1}

        this.handleSearch=this.handleSearch.bind(this);
    }
    componentWillMount() {


    }

    handleSearch(value){

    }
    componentDidMount() {
        if(localStorage.getItem("access_token")!=null)
        {
            axios.get("https://api.bamdb.cn/rating/browser",{params:{

                    type:0,
                    page:0,
                    pageSize:10
                }}).then(
                function(response)
                {
                    this.setState({rankitem:response.data});
                }.bind(this)
            )
        }
        else{
            //window.location.href="/#/login";
        }
    }

    render(){

        return(
            <Grid container justify={"space-around"} >
                <Grid item xs={9}>
                    <Progressmanage userid={this.state.userid} />
                </Grid>
                <Grid item xs={3} >
                    <TopItemList itemList={this.state.rankitem}/>
                </Grid>
            </Grid>
        )
    }
}

export  default Userhomepage;
