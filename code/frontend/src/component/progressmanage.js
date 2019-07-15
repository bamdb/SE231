import React, { Component } from 'react';
 
import Paper from '@material-ui/core/Paper';

import '../css/progressmanage.css';
import Scheduletable from './scheduletable'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Progressmanage extends Component {
    constructor(props) {
        super(props);
        this.state={label:0};
        this.state={
            items:[
                {readstat:[0,[1,0,1,0],0,1],itemname:"book1",kind:"book"},
                {readstat:[1,1,1],itemname:"book2",kind:"movie"},
                {readstat:[1,1,1,1],itemname:"book3",kind:"movie"},
                {readstat:[1,1,1,1],itemname:"book4",kind:"movie"}
                ],
            value:0
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }
    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var item=[];
        var items=this.state.items;
        for(var i=0;i<items.length;++i) {
            item.push(
                <Grid item xs={3}>
                    <Grid container >
                    <Scheduletable readstat={items[i].readstat} itemname={items[i].itemname} />
                    </Grid>
                </Grid>
            )
        }

        return(
            <div>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >我的图书</Typography>
                <Divider />
                <br/>
                <Grid container spacing={3}>
                    {item}
                </Grid>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >我的电影</Typography>
                <Divider />
                <br/>
                <Grid container spacing={3}>
                    {item}
                </Grid>
                <br/>
            </div>
        )
    }
}
export default Progressmanage;
