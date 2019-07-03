import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        minWidth : 1000,
        maxheight : 500,
    },
    avatar: {
        marginTop : 20,
        margin: 10,
    },
    card: {
        borderRadius: 10,
        borderSize: 3,
        maxWidth: 50
    }
});


/*
* 需要传入的props（包装成json后可以简化）
* props.username : 用户名
* props.date : 用户收藏时间
* props.grade : 用户评分
* props.comment : 用户简评
*/
class Reply extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        username : "null",
        date : "2000-1-1",
        grade : "null",
        comment : "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    };

    render() {
        return(
            <Container fixed className={useStyles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={2} justify="center">
                        <br/>
                        <Avatar alt="Remy Sharp" src="img/3.jpg" className={useStyles.avatar} />
                        <br/>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} justify="center">
                        <Card className={useStyles.card}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    发表评论
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="回复"
                                    multiline
                                    rows="8"
                                    fullWidth={true}
                                    className={useStyles.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button id="button" variant="contained" color="primary">提交</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}

export default Reply;