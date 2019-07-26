import React, { Component } from 'react';
import CarouselItem from '../component/carousel';
import Grid from '@material-ui/core/Grid';

class Recommendpage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div>
                <Grid container justify={"center"} alignContent={"center"}>
                    <Grid item xs={8} >
                        <CarouselItem />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Recommendpage;