/*
 * 条目具体信息左栏
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import '../css/pagetable.css'


import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Pagetable extends Component {
    constructor(props) {
        super(props);
        this.state={currentpage: 0}
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
 
    render() {
        var page=this.state.currentpage;
        var start=page-page%10;
        var item=[]
        for(var i=start;i<start+10;++i)
        {
            if(i!=page)
            {
                item.push(
                    <Grid item xs={1}>
                        <button class={"type3"}>{i}</button>
                    </Grid>
                )
            }
            else
            {
                item.push(
                    <Grid item xs={1}>
                        <button class={"type4"}>{i} </button>
                    </Grid>
                )
            }
        }
        return(
            <Grid container alignItems={"center"} direction={"column"} >
                <Paper>
                    <Grid container spacing={1}>
                        {item}
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}
export default Pagetable;
