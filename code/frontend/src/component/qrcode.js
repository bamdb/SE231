import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/login.css';
import axios from 'axios';
import Websocket from 'react-websocket';
import {Divider, Icon, Input, Tooltip} from "antd";

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state={
            uuid:undefined,
            QRsrc:"",
            qrcode:""
        }
    }

    componentDidMount() {
        if(this.props.uuid!==undefined)
        {
            axios.get("https://api.bamdb.cn/auth/qrcode",{params:{uuid:this.props.uuid}})
                .then(function (res) {
                    console.log(res.data);
                    this.setState({qrcode:res.data, uuid:this.props.uuid})
                }.bind(this))
        }
        else {
            window.location.href = "/404";
            window.location.reload();
        }
    }

    handlesocket(data){
        console.log("get message")
        console.log(data);
        localStorage.setItem("access_token",data);


        axios.get("https://api.bamdb.cn/auth/user").then(
            function (res) {
                localStorage.setItem("userid",res.data.id);
                localStorage.setItem("username",res.data.username);
                var auths=res.data.authorities;
                var role="";
                auths.map(auth=>{
                    if(role==""&&auth.authority.indexOf("ROLE")!=-1)
                    {
                        role=auth.authority;
                    }
                })
                localStorage.setItem("role",role);
                window.location.href="/";
                window.location.reload();
            }
        )

    }
    render(){
        const url="wss://ws.bamdb.cn/websocket/"+this.props.uuid+"/0";
        return(
            <div id={"login"}>
            <Websocket url={url}
                          onMessage={this.handlesocket.bind(this)}/>
            <Grid container alignContent={"center"} justify={"space-around"}>

                <Typography variant={"h4"} component="h4">登录至Bamdb</Typography>
                <Grid item xs={12}>
                    <br/><br/>
                    <Grid container alignContent={"center"} justify={"space-around"}>
                        <Grid item xs={1}/>
                        <Grid item xs={5}>
                            <img height={184} width={184} src={"https://api.bamdb.cn/auth/qrcode?uuid="+this.props.uuid}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider type={"vertical"} id={"divider-login"}/>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container spacing={1} justify={"center"} alignContent={"center"}>
                                <Grid item xs={12}>
                                    <br/>
                                    <Typography variant={"subtitle1"}>
                                        没有账户？<Button variant="text" color="primary" ><Link to={"/register"}>注册新用户</Link></Button></Typography><br/>
                                    <Typography variant={"subtitle1"} component="h4">忘记密码？
                                        <Button variant="text" color="primary" name={"resetPassword"} ><Link to={"/resetpassword"}>重置密码</Link></Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/><br/><br/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        )
    }
}
export default QRcode;

