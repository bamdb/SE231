import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import '../css/scheduletable.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from "@material-ui/core/Chip";
import Button from '@material-ui/core/Button';


class Scheduletable extends Component
{
    constructor(props) {
        super(props);
        this.state={read:[1,3,5],total:10};
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    render() {
        var read=this.state.read;
        var item=[];
        for(var i=1;i<this.state.total;++i)
        {
            if(read.has(i))
            {
                item.push(
                    <Button  id="button"  clickable color="primary" >{i}</Button>
                );
            }
            else{
                item.push(
                    <Button  id="button"  clickable color="secondary" >{i}</Button>
                );
            }

        }

        return(
            <div >
                <Paper id={"tagmain"}>
                    {item}
                </Paper>
            </div>
        )
    }
}
export default Scheduletable;