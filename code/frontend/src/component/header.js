import React, { Component } from 'react';
import { Link } from'react-router-dom'
import '../index.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Websocket from 'react-websocket';
import {Icon, Badge, Button, Menu, Dropdown} from 'antd';
import Messagepage from "../page/messagepage";
import Drawer from "@material-ui/core/Drawer";
import Alert from "./alert";


class Head extends Component{
    constructor(props) {
        super(props);
        this.state={
            islogin : (localStorage.getItem("userid") != null),
            openMess:false,
            messageCount:0,
            content:""
        };
        this.shareTo = this.shareTo.bind(this);
        this.logout = this.logout.bind(this);
        this.handleMessClose = this.handleMessClose.bind(this);
        this.handleMessOpen = this.handleMessOpen.bind(this);
    }

    shareTo(stype) {
        console.log("share")
        var ftit = '';
        var _summary = "分享摘要";
        var _pic ='http://m3.img.srcdd.com/farm4/d/2015/0113/11/6AE3FEBE500857BF82CA97E8F03DD6A8_B500_900_500_411.jpeg';

        //获取文章标题
        ftit = document.title;
        //qq空间接口的传参
        if (stype == 1) {
            console.log("qzone")
            window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + _pic + '&summary=' + _summary);
        }
        //新浪微博接口的传参
        if (stype == 'sina') {
            window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=' + ftit + '&pic=' + _pic + '&appkey=2706825840');
        }
        //qq好友接口的传参
        if (stype == 'qq') {
            window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + _pic + '&summary=' + _summary);
        }
        //生成二维码给微信扫描分享
        if (stype == 'wechat') {
            window.open('inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
        }
    }

    logout()
    {
        localStorage.clear();
        window.location.href = '/login';
    }

    handlesocket(){
        this.setState({messageCount:this.state.messageCount+1});
    }

    handleAlert(){
        this.setState({content:""})
    }

    handleMessOpen() {
        if(localStorage.getItem("userid"))
        this.setState({openMess:true,messageCount:0})
        else this.setState({content:'请先登录！'})
    }

    handleMessClose() {
        this.setState({openMess:false})
    }
    render(){
        const menu = <Menu>
            <Menu.Item>
                <Icon type="qq" onClick={this.shareTo.bind(this,'qq')}/>
            </Menu.Item>
            <Menu.Item>
                <Icon type="wechat" onClick={this.shareTo.bind(this,'wechat')} />
            </Menu.Item>
            <Menu.Item>
                <Icon type="weibo" onClick={this.shareTo.bind(this,'sina')} />
            </Menu.Item>
        </Menu>;

        const url="wss://ws.bamdb.cn/websocket/nouuid/"+localStorage.getItem("userid");
        const web = (localStorage.getItem("userid")) ?
            <Websocket url={url}
                       onMessage={this.handlesocket.bind(this)}/>:<span/>;
        return(
            <div >
                {web}
                <Alert content={this.state.content} cancelAlert={this.handleAlert.bind(this)} confirmAlert={this.handleAlert.bind(this)}/>
                <div id={"header"}>
                <Grid container justify={"space-between"}>
                    <Grid item xs={3} id={"bamdb"}>
                        <Typography variant="h6" noWrap color={"inherit"}>Bamdb</Typography>
                    </Grid>
                    <Grid item >
                    <Button type={"link"}>
                        <Link to={'/login'} >
                        <Icon type="login" id={"header-icon"}  hidden={this.state.islogin} />
                        </Link>
                    </Button>
                        <Icon type="logout" id={"header-icon"}  hidden={!this.state.islogin}
                              onClick={this.logout} />
                        <Badge count={this.state.messageCount} overflowCount={99} offset={[8,0]} >
                            <Icon type="message" id={"header-icon"} onClick={this.handleMessOpen} />
                        </Badge>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="share-alt" id={"header-icon"}/>
                            </a>
                        </Dropdown>
                    </Grid>
                </Grid>
                </div>
                <Drawer
                    anchor={"right"}
                    open={this.state.openMess}
                    onClose={this.handleMessClose}
                >
                    <div id={"message"}>
                        <Messagepage />
                    </div>
                </Drawer>
            </div>

        )
    }
}

export default Head;
