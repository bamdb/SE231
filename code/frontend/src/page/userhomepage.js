import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Progressmanage from '../component/progressmanage';
import LeftAppBar from '../component/leftappbar';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {grey, purple} from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl";

class Userhomepage extends Component{

    constructor(props){
        super(props);
        this.state={rankitem:[]}

        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }
    componentDidMount() {
        axios.get("http://47.103.107.39:34371/browser",{params:{
                type:0,
                page:0,
                pageSize:3
            }}).then(
                function(response)
                {
                    this.setState({rankitem:response.data});
                }.bind(this)
        )
    }

    render(){
        return(
            <Grid container spacing={2}>
                <Grid item xs={2}>
                   <Navigation></Navigation>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={8}>
                    <TextField
                        id="outlined-dense"
                        label="Search"
                        margin="dense"
                        variant="outlined"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Progressmanage />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                        <TopItemList itemList={this.state.rankitem}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        )
    }
}

export  default Userhomepage;