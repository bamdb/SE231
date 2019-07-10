import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

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
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({rank:nextProps.rank,name:nextProps.name,avgScore:nextProps.avgScore,itemId:nextProps.itemId})
    }

    render() {
        var url='/useriteminfopage/'+this.state.itemId;
        return(
            <Card className={useStyles.card}>
                <div className={useStyles.details}>
                    <CardContent className={useStyles.content}>
                        <Link to={url}>
                            {this.state.name}
                        </Link>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.state.avgScore}分
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={useStyles.cover}
                    img={""} //图片
                />
            </Card>
        )
    }
}

export default TopItem;