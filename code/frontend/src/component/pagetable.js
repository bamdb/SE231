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
        this.handlepagechange=this.handlepagechange.bind(this);
        this.handleplus=this.handleplus.bind(this);
        this.handleminus=this.handleminus.bind(this);
    }
    handlepagechange(e)
    {
        this.setState({currentpage:e.target.value});
        this.props.handlepagechange(this.state.currentpage)
    }
    handleminus()
    {
        if((this.state.currentpage-10)>=0)
        {
            this.setState({currentpage:parseInt(this.state.currentpage)-10})
        }
        else
        {
            this.setState({currentpage:parseInt(this.state.currentpage)-0})
        }
        this.props.handlepagechange(this.state.currentpage)

    }
    handleplus()
    {

        this.setState({currentpage:parseInt(this.state.currentpage)+10})
        this.props.handlepagechange(this.state.currentpage)
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
 
    render() {
        var page=this.state.currentpage;
        var start=page-page%10;
        var item=[]
        item.push(<Grid item xs={1}>
            <button class={"type4"}onClick={this.handleminus}>{'<<'} </button>
        </Grid>)
        for(var i=start;i<start+10;++i)
        {
            if(i!=page)
            {
                item.push(
                    <Grid item xs={1}>
                        <button onClick={this.handlepagechange} class={"type3"} value={i}>{i}</button>
                    </Grid>
                )
            }
            else
            {
                item.push(
                    <Grid item xs={1}>
                        <button onClick={this.handlepagechange} class={"type4"}value={i}>{i} </button>
                    </Grid>
                )
            }
        }
        item.push(<Grid item xs={1}>
            <button class={"type4"}onClick={this.handleplus}>{'>>'} </button>
        </Grid>)
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
