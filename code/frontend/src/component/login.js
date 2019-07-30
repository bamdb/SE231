import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/login.css';
import axios from 'axios';
import Alert from './alert';
import {Divider, Icon, Input, Tooltip} from "antd";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            content:"",
            islogin: 7,
            forgetPassword: false,
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.submit = this.submit.bind(this);
        this.setQR = this.setQR.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
    }

    handleAlert(){
        this.setState({content:""})
        this.props.setQR(false,undefined);
    }
    setQR(){
        axios.get("http://202.120.40.8:30741/auth/uuid")
            .then(function (res) {
                console.log(res.data);
                this.props.setQR(true,res.data);
            }.bind(this))
            .catch(function (err) {
                this.setState({
                    content:"抱歉，现在暂不支持微信扫码登录，请使用账号密码登录。"
                })
            }.bind(this))
    }

    submit(){
        const _this = this;
        let user = {
            username: this.state.name,
            password: this.state.password,
        }
        var params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", this.state.name);
        params.append("password", this.state.password);
        params.append("client_id", "browser");
        params.append("client_secret", "");

        axios.post("http://202.120.40.8:30741/auth/oauth/token",
            params,
            {headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials:true})
            .then(function (res) {
                _this.setState({
                    islogin: res.data,
                })
                localStorage.setItem("access_token",res.data.access_token);
                localStorage.setItem("username",_this.state.name);

                axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
                var url="http://202.120.40.8:30741/auth/username/"+localStorage.getItem("username");
                axios.get(url,{params:{}}).then(
                    function(res)
                    {
                        localStorage.setItem("userid",res.data.id);
                        window.location.href="/#/";
                        window.location.reload();
                    }

                )
                axios.get("http://202.120.40.8:30741/auth/oauth/check_token",{params:{token:localStorage.getItem("access_token")}}).then(
                    function(res)
                    {
                        var auths=res.data.authorities;
                        var role="";
                        auths.map(auth=>{
                            if(role==""&&auth.indexOf("ROLE")!=-1)
                            {
                                role=auth;
                            }
                        })

                        localStorage.setItem("role",role);

                    }
                )

            })
            .catch(function (error) {
                _this.setState({
                    islogin: 0,
                })
            });



    }

    handleInforChange(e){
        let o= {};
        o[e.target.id]=e.target.value;
        this.setState(o);
    }

    render(){
        if(this.state.islogin === 1) {
            window.location.href("http://localhost:3000/#/");
        }
        return(
            <Grid container alignContent={"center"} justify={"space-around"}>
                <Alert content={this.state.content} cancelAlert={this.handleAlert} confirmAlert={this.handleAlert}/>
                <Typography variant={"h4"} component="h4">登录至Bamdb</Typography>
                <Grid item xs={12}>
                    <br/><br/>
                    <Grid container alignContent={"center"} justify={"space-around"}>
                        <Grid item xs={1}/>
                <Grid item xs={5}>
                    <Typography component="p">用户名</Typography>
                    <Input id={"name"}
                           allowClear={true}
                           value={this.state.name}
                           onChange={this.handleInforChange}
                    /><br/>
                    <Typography variant={"subtitle1"}>密码</Typography>
                    <Input.Password id={"password"}
                                    allowClear={true}
                                    value={this.state.password}
                                    onChange={this.handleInforChange}
                    /><br/>
                    <div id={"button"} >
                    <Button
                        variant="outlined"
                        color="primary"
                        name={"submit"}
                        onClick={this.submit}
                    >登录
                    </Button>
                    </div>
                    <br/>
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
                            <Typography variant={"subtitle1"} component="h4">
                                忘记密码？<Button variant="text" color="primary" name={"resetPassword"} ><Link to={"/resetpassword"}>重置密码</Link></Button>
                            </Typography>
                            <Button variant="text" color="primary" name={"resetPassword"} onClick={this.setQR}>微信扫码登录</Button>
                        </Grid>
                    </Grid>
                    <br/><br/><br/>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}


export default Login;
