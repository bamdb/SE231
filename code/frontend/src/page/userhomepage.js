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
                <main>
                    <Grid container >
                        <Grid item xs={1} />
                        <Grid item xs={10}>
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
                </main>

        )
    }
}

export  default Userhomepage;