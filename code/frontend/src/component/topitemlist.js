import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import '../css/item.css'
import TopItem from './topitem';
import Typography from "@material-ui/core/Typography";


class TopItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({items:nextProps.itemList});
    }

    render(){

        var rows=[];
        var items=this.state.items;
        for(var i=0;i<items.length;++i)
        {
            rows.push(
                <TopItem key={i} name={items[i].item.itemname} rank={items[i].rating.rank} avgScore={items[i].rating.avgScore} itemId={items[i].item.id}/>
            );
        }

        return(
            <div>
                <Grid container spacing={2} justify={"flex-end"} wrap={"nowrap"}>
                    <Grid item xs={11} >
                        <br/>
                        <Typography variant={"subtitle1"} color={"textSecondary"} >排行榜</Typography>
                        <Divider />
                        <br/>
                        {rows}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TopItemList;