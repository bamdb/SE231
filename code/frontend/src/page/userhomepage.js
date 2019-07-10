import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Progressmanage from '../component/progressmanage'
import Listitem from '../component/listitem'
import axios from 'axios'
import PropTypes from "prop-types"
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

class Userhomepage extends Component{

    constructor(props){
        super(props);
        this.state={rankitem:[]}

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
            <Grid container spacing={10}>
                <Grid item xs={12}><Navigation/></Grid>
                <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <Progressmanage />
                    </Grid>
                    <Grid item xs={2}>
                        <TopItemList itemList={this.state.rankitem}/>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default Userhomepage;