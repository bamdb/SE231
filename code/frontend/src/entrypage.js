import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Navigation from "./component/navigation";
import TopItemList from "./component/topitemlist";
import Browserlist from "./component/browserlist";
import Tag from "./component/tag";
import Userinfo from "./component/userinfo";
import Commentlist from "./component/commentlist";
import Listitem from './component/listitem'
import Progressmanage from "./component/progressmanage";


class EntryPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3} >

                        <Grid item xs={2}>

                            <Tag />
                        </Grid>
                        <Grid item xs={10}>

                            <Listitem />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export  default EntryPage;