import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Divider } from 'antd';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Message from "./message";
class Messagelist extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            messages:[
                {
                    message:
                        {
                            senderId:1,
                            receiverId:1,
                            content:"asdadadasd"
                        },
                    user:{username:"shenruien"}
                }
                ],
            userid:1
        }
        this.handleaddfriend=this.handleaddfriend.bind(this);
        this.getButton = this.getButton.bind(this);
    }
    getButton(type,senderId, receiverId) {
        return type ? <Button size={"small"} onClick={this.handleaddfriend(senderId,receiverId)}>同意</Button> : <div></div>
    }

    handleaddfriend(senderId,receiverId)
    {
        axios.get("http://202.120.40.8:30741/friend/isfriend?userId1="+senderId+"&userId2="+receiverId).then(
            function(res)
            {
                if(res.data==false)
                {
                    axios.post("http://202.120.40.8:30741/friend/add",{userId1:senderId,userId2:receiverId,status:0})
                }
                else {
                    alert("you already have friend");
                }
            }
        )
    }
    componentWillMount() {
        if(localStorage.getItem("userid")==null)
        {

        }
        else {
            this.setState({userid:localStorage.getItem("userid")})
        }
    }

    componentDidMount() {
        var url="http://202.120.40.8:30741/message/"+this.props.type+"/"+localStorage.getItem("userid");
        axios.get(url).then(
            function(response)
            {
                this.setState({messages:response.data});
            }.bind(this)
        )
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var url="http://202.120.40.8:30741/message/"+nextProps.type+"/"+localStorage.getItem("userid");
        axios.get(url).then(
            function(response)
            {
                this.setState({messages:response.data});
            }.bind(this)
        )
    }

    render()
    {
        var messages=this.state.messages;
        var rows=[];
        for(var i=0;i<messages.length;++i)
        {
                if(messages[i].message.content=="加为好友"&&this.props.type==1)
                {
                    rows.push(
                        {
                            senderId:messages[i].message.senderId,
                            receiverId:messages[i].message.receiverId,
                            avater: messages[i].user.imgurl,
                            senderName: messages[i].user.username,
                            content: messages[i].user.username+"请求加您为好友！",
                            type:1
                        }
                    );
                }
                else
                {
                    rows.push(
                        {
                            senderId:messages[i].message.senderId,
                            receiverId:messages[i].message.receiverId,
                            avater: messages[i].user.imgurl,
                            senderName: messages[i].user.username,
                            content: messages[i].message.content,
                            type:0
                        }
                    );
                }
        }


        return(
            <List
                itemLayout="horizontal"
                dataSource={rows}
                renderItem={item => (
                    <div style={{padding:20}} >
                <List.Item
                    extra= {this.getButton(item.type,item.senderId,item.receiverId) }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avater} />}
                        title={item.senderName}
                        description={item.content}
                    />
                </List.Item>
                    </div>
            )}
            />
        )
    }
}
export default Messagelist;
