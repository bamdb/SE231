import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
    },

}));

class TopPart extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid xs={3} className={useStyles.root} >
                <Grid>
                    
                </Grid>
                <Grid>

                </Grid>
            </Grid>
        )
    }
}

class HomePage extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(

        )
    }
}