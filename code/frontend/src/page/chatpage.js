import React, { Component } from 'react';
import Chat from 'chat-react';
import Identicon from "identicon.js";
import '../css/chatbox.css';

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
        this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
    }
    render() {
        const {inputValue, messages, timestamp} = this.state;
        const islogin = (localStorage.getItem("userid")!=null);

        var data = new Identicon(this.state.uuid, 420).toString();
        const userInfo = islogin? {
            avatar: "https://api.bamdb.cn/image/id/"+localStorage.getItem("userid")+"0",
            name: localStorage.getItem("username"),
            userId: localStorage.getItem("userid").toString()
        } : {
            avatar: "data:image/png;base64," + data,
            name: "匿名",
            userId: 0
        }
        console.log(messages)
        return (
            <Chat
                width="400px"
                ref={el => this.chat = el}
                className="my-chat-box"
                dataSource={messages}
                userInfo={userInfo}
                value={inputValue}
                sendMessage={this.sendMessage}
                timestamp={timestamp}
                placeholder="write some thing..."
                messageListStyle={{width: '100%', height: window.outerHeight}}
            />
        );
    }
}

export default Chatpage;
