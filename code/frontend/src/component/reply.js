import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import $ from 'jquery'
const useStyles = makeStyles(theme =>({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        marginTop : 20,
        margin: 10,
    },
}));


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
        this.state={text:"",userid:1}
        this.handleclick=this.handleclick.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    handlechange(e)
    {
        this.setState({text:e.target.value})
    }
    componentWillMount() {
        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/#/login";
        }
        else {
            this.setState({userid:localStorage.getItem("userid")})
        }
    }

    handleclick()
    {
        var text=this.state.text;
        /*axios.post("http://202.120.40.8:30741/topic/add/reply?topicId=1&userId=1",text).then();*/
        $.ajax({
            url:"http://202.120.40.8:30741/topic/add/reply?topicId=",
            type:"POST",
            contentType:"application/json",
            data:text,
            success: function f(data) {
                console.log(data);
            }.bind(this)
        })
    }
    static defaultProps = {
        username : "null",
        date : "2000-1-1",
        grade : "null",
        comment : "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    };
 
    render() {
        return(
                <Paper className={useStyles.root} >
                <Grid container >
                    <br/>
                    <Grid item xs={1} />
                    <Grid item xs={1}>
                        <br/>
                        <Avatar alt="Remy Sharp" src="img/3.jpg" className={useStyles.avatar} />
                        <br/>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography color="textSecondary" gutterBottom>
                            发表评论
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            label="回复"
                            multiline
                            rows="8"
                            fullWidth={true}
                            className={useStyles.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlechange}
                        />
                        <Button id="button" variant="contained" color="primary" onClick={this.handleclick}>提交</Button>
                    </Grid>
                    <Grid item xs={1} />
                </Grid><br/>
                </Paper>
        );
    }

}

export default Reply;