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


const useStyles = makeStyles(theme => ({
    root:{
        width: "20%",
    }
}));
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

class Userfavoritespage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid container direction={"column"} spacing={12} >
                <Grid item xs={12}><Navigation/></Grid>
                <Grid container direction={"row"} alignItems={"center"} spacing={2}>

                    <Grid item xs={2}>
                        <Tag />
                    </Grid>
                    <Grid item xs={10} >
                        <br/>
                        <br/>

                        <Commentlist />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default Userfavoritespage;