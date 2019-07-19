import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
class Message extends Component{
    constructor(props)
    {
        super(props);
        this.state={message:{message:{}}}
        this.handleaddfriend=this.handleaddfriend.bind(this);
    }
    handleaddfriend()
    {
        axios.post("http://202.120.40.8:30741/friend/add",{userId1:this.state.message.message.senderId,userId2:this.state.message.message.receiverId,status:0})
    }
    componentWillMount() {
        this.setState({message:this.props.message});

    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({message:nextProps.message});
    }

    render()
    {
        var message=this.state.message;
            if(this.props.button==0)
            {
                return(
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography>from:{message.user.username||1}</Typography>
                            <Typography>to:{message.message.receiverId||1}</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{message.message.content||"hello"}</Typography>
                        </Grid>
                    </Grid>
                )
            }
            else
            {
                return(
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>from:{message.user.username||1}</Typography>
                        <Typography>to:{message.message.receiverId}</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>{message.message.content}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleaddfriend}>同意</Button>
                    </Grid>
                </Grid>
                );
            }
    }
}
export default Message;