import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import '../css/item.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TopItem from './topitem';

const useStyles = makeStyles(theme => ({
    root:{
        minWidth:300,
    }
}));

class TopItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        /*
         * 收集最热条目信息
         *
         */
    }

    render(){
        var topItemList = this.props.topItemList;
        var rows=[];
        var rank=0;

        /*
        topItemList.forEach((topItem) =>{
            rank+=1;
            rows.push(
                <TopItem rank={rank} name={topItem.name} fansTotal={topItem.fansTotal} />
            );
        });
    */
        rows.push(
                <TopItem />
        );
        rows.push(
                <TopItem />
        );
        rows.push(
                <TopItem />
        );
        return(
            <Grid container className={useStyles.root} spacing={2} >
                <Grid direction={"column"} >
                {rows}
                </Grid>
            </Grid>
        );
    }
}

export default TopItemList;