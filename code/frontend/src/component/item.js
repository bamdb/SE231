import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';

import '../css/item.css'
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Item extends Component {
    constructor(props) {
        super(props);
        this.state={name:"三体",date:"2000-1-1",author:"Liu Cixin",pages:"100",isbn:"123456"}
    }
    componentWillMount() {
        if(this.props.name!=null)
        {

            this.setState({name:this.props.name,date:this.props.date,pages:this.props.pages,isbn:this.props.isbn})
        }

    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.name!=null)
        {
            this.setState({name:nextProps.name,date:nextProps.date,pages:nextProps.pages,isbn:nextProps.isbn})
        }
    }

    componentDidMount() {
    }


    render() {
        return(
            <Grid container alignItems={"center"} direction={"column"} >
                <Paper>
                <Grid item xs={12}>
                    <img src="img/3.jpg" id="itemimage" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >名称</Typography>
                    <Typography variant={"p"} component={Link} to={"/useriteminfopage/"+this.state.name} color={"textSecondary"} >{this.state.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >发行日期</Typography>
                    <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.date.split("T")[0]}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >作者</Typography>
                    <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.author}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >页数</Typography>
                    <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.page}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h6"} component={"h6"} color={"textPrimary"} >ISBN</Typography>
                    <Typography variant={"p"} component={"p"} color={"textSecondary"} >{this.state.isbn}</Typography>
                </Grid>
                </Paper>
            </Grid>
        )
    }
}
export default Item;