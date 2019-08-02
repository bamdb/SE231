import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import '../index.css'
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import { Divider} from 'antd';


class TopItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank:1,
            name: "三体",
            avgScore:8,
            itemId:1
        }
    }
    componentWillMount() {
        this.setState({rank:this.props.rank,name:this.props.name,avgScore:this.props.avgScore,itemId:this.props.itemId})
    }

    render() {
        var url='/itemdetail/'+this.state.itemId;
        return(
                <div id={"hot-item"}>
                    <Grid container justify={"center"} alignContent={"flex-start"}  spacing={2}  wrap={"nowrap"}>
                        <Grid item xs={1}>
                            {this.state.rank}
                        </Grid>
                        <Grid item xs={8}>
                        <Link to={url}>
                            <Typography variant={"subtitle2"} color={"primary"}> {this.state.name} </Typography>
                        </Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container justify={"flex-end"} alignContent={"flex-end"}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {this.state.avgScore}分
                        </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                </div>
        )
    }
}

export default TopItem;