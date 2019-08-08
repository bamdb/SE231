/*
 * 单个topic下讨论区
 * 用户头像
 * username
 * date floor
 * content
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import {Modal} from "antd";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


/*
* 需要传入的props(需要以列表形式传入，通过map渲染到每个listItem当中)
* props.username : 用户名
* props.date : 用户发表讨论时间
* props.discuss : 用户发表讨论内容
* props.floor : 当前讨论层数
*/

class DiscussBody extends Component{
    constructor(props){
        super(props);
        this.state = {username: "",discuss:this.props.data.replyContent,date:"2019-01-01T1234",visible:false}
        this.handlevisible=this.handlevisible.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    handleOk()
    {
        var date=Date.parse(new Date());
        axios.post("https://api.bamdb.cn/message/add",{senderId:localStorage.getItem("userid"),receiverId:this.props.data.user.id,sendTime:date,content:"加为好友"})
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
    componentDidMount() {
        const id = this.props.data.user.id;
       // this.state.data.replyContent;
        axios.get("https://api.bamdb.cn/user/id/"+id).then(
            function (response){
                this.setState({username:response.data.username});
            }.bind(this)
        )

    }

    render(){
        return(
            <Grid container justify={"space-around"}  >
                <Grid item xs={1}>
                    <Avatar alt="" src={"https://api.bamdb.cn/image/id/"+this.props.data.user.id+"0"} onClick={this.handlevisible}/>
                    <Modal title="加为好友" visible={this.state.visible}
                           onOk={this.handleOk} onCancel={this.handleCancel}
                    >

                    </Modal>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant={"h6"} component={"h6"}
                                color={"textPrimary"} >{this.state.username}</Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        {this.state.date.split("T")[0]} - #{this.props.floor}
                    </Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        color="textPrimary"
                    >
                        {this.state.discuss}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

class Discuss extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const replies = this.props.replies;
        var rows=[];
        if(replies !== undefined) {
            for (var i=0; i<replies.length;++i) {
                rows.push(

                    <DiscussBody data={replies[i]} floor={i} />
                )
                rows.push(<Divider variant="inset"/>);
            }
            rows.pop();
        }

        return(
            <Grid container spacing={1}>
                <Grid item xs={12}>
            <Paper className={useStyles.root}>
                {rows}
            </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Discuss;
