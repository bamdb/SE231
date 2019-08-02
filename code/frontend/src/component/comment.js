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
import {Modal, Divider} from "antd";
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
        this.state={visible:false,grade:""};
        this.handlevisible=this.handlevisible.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    handleOk()
    {
        var date=Date.parse(new Date());
        axios.post("http://202.120.40.8:30741/message/add",{senderId:localStorage.getItem("userid"),receiverId:this.props.username,sendTime:date,content:"加为好友"})
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
        username : "admin",
        date : "2000-1-1",
        grade : "null",
        comment : "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    };
    componentWillReceiveProps(nextProps, nextContext) {
        axios.get("http://202.120.40.8:30741/rating/score",{params:{itemId:nextProps.itemid,userId:nextProps.userid}})
            .then(function (res) {
                this.setState({grade:res.data.score})
            }.bind(this))

    }

    render() {
        return(
            <Container >
                <Divider />
                <Grid container spacing={2}>
                    <Grid item xs={2} justify="center">
                        <Avatar src={"http://202.120.40.8:30741/image/"+this.props.userid+"0"} className={useStyles.avatar} onClick={this.handlevisible}/>
                        <Modal title="加为好友" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                        >

                        </Modal>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} justify="center">
                        <Typography color="textSecondary" gutterBottom>
                            收藏日期: {this.props.date.split('T')[0]}
                        </Typography>

                        <Typography variant="h5" component="h2">
                            评分： {this.state.grade}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.comment}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}

export default Comment;
