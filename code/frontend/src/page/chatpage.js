import React, { Component } from 'react';
import Chat from 'chat-react';
import Identicon from "identicon.js";
import '../css/chatbox.css';
import Websocket from 'react-websocket';
import axios from "axios";

class Chatpage extends Component {
    state = {
        inputValue: '',
        messages: [{timestamp: 1545925494422,
                    userInfo: {
                        avatar: "https://raw.githubusercontent.com/bamdb/SE231/master/code/frontend/public/bamdb.jpg",
                        name: "Bamdb",
                        userId: "1544365758856"
                    },
                    value: "欢迎来到Bamdb聊天室"}],
        timestamp: new Date().getTime(),
        uuid: ""
    }

    componentWillMount() {
        this.setState({uuid : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        })
        });
    }

    handlesocket(message) {
        const userid = message.split(' ')[0]
        const content = message.slice(2)
        const {messages = []} = this.state;
        if (userid == localStorage.getItem("userid")) {
            return
        }
        axios.defaults.headers.common['Authorization'] = "";
        axios.get("https://api.bamdb.cn/auth/id/"+userid).then(
            function (response){
                const v = {
                    timestamp: (new Date()).getTime(),
                    userInfo: {
                        avatar: "https://api.bamdb.cn/image/id/"+response.data.id+"0",
                        name: response.data.username,
                        userId: response.data.id
                    },
                    value: content
                };
                messages.push(v);
                console.log(messages)
                this.setState({messages: messages, timestamp: new Date().getTime()});
            }.bind(this)
        )
    }

    setInputfoucs = () => {
        this.chat.refs.input.inputFocus();  //set input foucus
    }

    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }

    sendMessage = (v) => {
        const {value} = v;
        if (!value) return;
        const {messages = []} = this.state;
        messages.push(v);

        axios.put("https://api.bamdb.cn/message/chat",{},{params:{userId:v.userInfo.userId,content:v.value}}).then(
            function(res)
            {
                console.log("success")
            }
        );
        this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
    }

    render() {
        const {inputValue, messages, timestamp} = this.state;
        const islogin = (localStorage.getItem("userid")!=null);
        const url = "wss://ws.bamdb.cn/chatwebsocket"
        const data = new Identicon(this.state.uuid, 420).toString();
        const userInfo = islogin? {
            avatar: "https://api.bamdb.cn/image/id/"+localStorage.getItem("userid")+"0",
            name: localStorage.getItem("username"),
            userId: localStorage.getItem("userid").toString()
        } : {
            avatar: "data:image/png;base64," + data,
            name: "匿名",
            userId: 0
        }
        return (
            <div class="chat-box-wrapper">
                <Websocket onMessage={this.handlesocket.bind(this)} url={url}/>
                <Chat
                    width="400px"
                    ref={el => this.chat = el}
                    className="my-chat-box"
                    dataSource={messages}
                    userInfo={userInfo}
                    value={inputValue}
                    sendMessage={this.sendMessage}
                    timestamp={timestamp}
                    placeholder="请输入内容"
                    messageListStyle={{width: '100%', height: window.outerHeight}}
                />
            </div>
        );
    }
}

export default Chatpage;
