import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import '../css/item.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
})
)

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
        var url='/useriteminfopage/'+this.state.itemId;
        return(
                <div className={useStyles.details}>
                    <Grid container justify={"center"} alignContent={"flex-start"}  spacing={2} >
                        <Grid item xs={1}>
                            {this.state.rank}
                        </Grid>
                        <Grid item xs={8} wrap={"nowrap"}>
                        <Link to={url}>
                            <Typography variant={"h6"} color={"textPrimary"}> {this.state.name} </Typography>
                        </Link>
                        </Grid>
                        <Grid item xs={3} wrap={"nowrap"} >
                            <Grid container justify={"flex-end"} alignContent={"flex-end"}>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.state.avgScore}分
                        </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

export default TopItem;