import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from "@material-ui/core/Avatar";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import {Modal} from "antd";
import  axios from "axios";
 
const useStyles = makeStyles({
    root: {
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
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state={visible:false};
        this.handlevisible=this.handlevisible.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    handleOk()
    {
        var date=Date.parse(new Date());
        axios.post("http://202.120.40.8:30741/message/add",{senderId:1,receiverId:1,sendTime:date,content:"加为好友"})
        this.setState({visible:false});
    }
    handleCancel()
    {
        this.setState({visible:false});

    }

    handlevisible()
    {
        this.setState({visible:true});
    }

    static defaultProps = {
        username : "null",
        date : "2000-1-1",
        grade : "null",
        comment : "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    };

    render() {
        return(
            <Card>
            <Container >
                <Grid container spacing={2}>
                    <Grid item xs={2} justify="center">
                        <br/>
                        <Avatar alt="Remy Sharp" src="img/3.jpg" className={useStyles.avatar} onClick={this.handlevisible}/>
                        <Modal title="加为好友" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                        >

                        </Modal>
                        <br/>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} justify="center">
                        <Typography color="textSecondary" gutterBottom>
                            收藏日期: {this.props.date}
                        </Typography>

                        <Typography variant="h5" component="h2">
                            评分： {this.props.grade}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.comment}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            </Card>
        );
    }

}

export default Comment;