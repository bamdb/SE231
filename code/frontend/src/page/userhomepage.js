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

const useStyles=makeStyles({
    root: {
        display: 'flex',
    },
})

class Userhomepage extends Component{

    constructor(props){
        super(props);
        this.state={rankitem:[]}

        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }
    componentDidMount() {
        axios.get("http://202.120.40.8:30741/rating/browser",{params:{
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

    render(){
        return(
            <Grid container justify={"space-around"} alignContent={"center"}>
                <Grid item xs={9}>
                    <TextField
                        id="outlined-dense"
                        label="Search"
                        margin="dense"
                        variant="outlined"
                    />
                    <Grid container spacing={2} alignContent={"center"}>
                        <Grid item xs={12}>
                            <Progressmanage />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} >

                    <Grid container spacing={2} alignContent={"center"} >
                        <Grid item xs={12}>
                            <TopItemList itemList={this.state.rankitem}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Userhomepage;