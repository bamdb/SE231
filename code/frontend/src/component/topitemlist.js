import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import '../css/item.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TopItem from './topitem';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root:{
        minWidth:300,
    }
}));

class TopItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
    }
 
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({items:nextProps.itemList});
    }

    render(){

        var rows=[];
        var rank=0;
        var items=this.state.items;
        /*
        topItemList.forEach((topItem) =>{
            rank+=1;
            rows.push(
                <TopItem rank={rank} name={topItem.name} fansTotal={topItem.fansTotal} />
            );
        });
    */
        for(var i=0;i<items.length;++i)
        {
            rows.push(
                <TopItem key={i} name={items[i].item.itemname} rank={items[i].rating.rank} avgScore={items[i].rating.avgScore} itemId={items[i].item.id}/>
            );
        }

        return(
            <div>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >排行榜</Typography>
                <Divider />
                <br/>
                <Grid container className={useStyles.root} spacing={2} >
                    <Grid >
                    {rows}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TopItemList;