import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '../component/alert';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import '../css/register.css';
import { Steps, Divider, Input, Tooltip, Icon } from 'antd';

const { Step } = Steps;

const  usernameRegex = /^\w{3,15}$/;
const passwordRegex = /^\w{6,18}$/;
const emailRegex = /^\w+@\w+(\.\w+)+$/;

var checkpassword2=<span/>;
var checkpassword=<span/>;
var checkname=<span/>;
var checkemail=<span/>;

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            password2:"",
            email:"",
            verify:false,
            finish:false,
            islogin: false,
            forgetPassword: false,
            content:"",
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submit=this.submit.bind(this);
        this.toverify=this.toverify.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
    }

    handleAlert(){
        this.setState({content:""})
    }

    toverify(){
        var valid=true;
        var content=[];
        if(!usernameRegex.test(this.state.name)){
            content="请输入合法用户名！\n";
            valid=false;
        }
        if(!passwordRegex.test(this.state.password)){
            content+="请检查密码格式是否正确！\n";
            valid=false;
        }
        else if(this.state.password!==this.state.password2){
            content+="两次密码输入不一致！\n";
            valid=false;
        }
        if(!emailRegex.test(this.state.email)){
            content+="邮箱格式有误！\n";
            valid=false;
        }

        if(!valid) {this.setState({content:content}); return ;}

        const rows={
            username: this.state.name,
            password: this.state.password,
            mail: this.state.email
        }
        //开始验证
        axios.post("http://202.120.40.8:30741/auth/verify",rows,{headers:{"Content-Type":'application/json'}})

        this.setState({verify:true});
    }
    submit()
    {
        /*
        axios.post("http://202.120.40.8:30741/auth/signup",{
            username:this.state.name,
            password:this.state.password
        },
            {
                withCredentials:true
            })

         */
        this.setState({finish:true})
    }

    handlePassword(){
        /* 忘记密码 */
    }

    handleInforChange(e){
        let o= {};
        o[e.target.id]=e.target.value;
        this.setState(o);
    }
 
    render() {
        checkname = (this.state.name==="" ) ? <span /> :
            (usernameRegex.test(this.state.name) ? <Icon type={"check"} id={"checkdone"} /> : <Icon type={"warning"} id={"checkfalse"} />);

        checkpassword = (this.state.password==="" ) ? <span /> :
            (passwordRegex.test(this.state.password) ? <Icon type={"check"} id={"checkdone"} /> : <Icon type={"warning"} id={"checkfalse"} />);

        checkemail = (this.state.email==="" ) ? <span /> :
            (emailRegex.test(this.state.email) ? <Icon type={"check"} id={"checkdone"} /> : <Icon type={"warning"} id={"checkfalse"} />);

        checkpassword2 = (this.state.password2==="" ) ? <span /> :
            (this.state.password===this.state.password2 ? <Icon type={"check"} id={"checkdone"} /> : <Icon type={"warning"} id={"checkfalse"} />);

        const button= this.state.verify ? <div></div>
            : <Button
                id={"button"}
                variant="outlined"
                color="primary"
                name={"toverify"}
                onClick={this.toverify}
            >开始验证
            </Button>;

        const current = this.state.verify ? (this.state.finish ? 2 : 1):0;
        if(current == 1) return (
            <div>
                <Steps progressDot current={current}>
                    <Step title="填写信息" />
                    <Step title="邮箱验证"  />
                    <Step title="注册完成"  />
                </Steps>
            <div id="register">
                <h2>邮件已发送！</h2><br/>
                <h4>请前往注册邮箱进行确认，确认完成即可登录账号畅游Bamdb！<br/>
                    <Button variant={"text"} color="primary" onClick={this.submit}>确定</Button><br/>
                    未收到邮件？<Button variant={"text"} color="primary" onClick={this.toverify} >重新发送邮件</Button>
                </h4>
            </div>
            </div>

        )

        if(current==2) return (
            <div>
                <Steps progressDot current={current}>
                    <Step title="填写信息" />
                    <Step title="邮箱验证"  />
                    <Step title="注册完成"  />
                </Steps>
                <div id="register">
                <h2>注册完成！</h2><br/>
                <h4><Button variant={"text"} color="primary" ><Link to={"/login"}>前往登录</Link></Button><br/>
                如有任何疑问欢迎联系Bamdb！</h4>
                </div>
            </div>
        )
        return(
            <Grid container justify={"space-around"} alignContent={"center"}>
                <Alert content={this.state.content} confirmAlert={this.handleAlert} cancelAlert={this.handleAlert} />
                <Grid item xs={9}>
                <Steps progressDot current={current}>
                    <Step title="填写信息" />
                    <Step title="邮箱验证"  />
                    <Step title="注册完成"  />
                </Steps>
                        <div id={"register"}>
                    <Typography variant={"h4"} component="h4" >注册成为Bamdb会员</Typography> <br/>
                    </div>
                </Grid>
                <br/>
                <Grid item xs={12} />
                <Grid item xs={5}>
                    <div id={"register-body"}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}/>
                        <Grid item xs={10}>
                            <Typography variant={"subtitle1"}>输入用户名</Typography>
                            <Input id={"name"}
                                   allowClear={true}
                                   suffix={
                                           <Tooltip title={"用户名由3-15个字符组成，可以是字母、汉字、数字及下划线"}>
                                               <Icon type="info-circle" id={"tooltip"} />
                                           </Tooltip>
                                   }
                                   value={this.state.name}
                                   onChange={this.handleInforChange}
                            />{checkname}<br/>
                            <Typography variant={"subtitle1"}>输入密码</Typography>
                            <Input.Password id={"password"}
                                   allowClear={true}
                                   suffix={
                                           <Tooltip title={"密码由6-18个字符组成，包括字母、数字和其他符号"}>
                                               <Icon type="info-circle" id={"tooltip"}/>
                                           </Tooltip>
                                   }
                                   value={this.state.password}
                                   onChange={this.handleInforChange}
                            />{checkpassword}<br/>
                            <Typography variant={"subtitle1"}>再次输入密码</Typography>
                            <Input.Password id={"password2"}
                                   allowClear={true}
                                   suffix={
                                           <Tooltip title={"确认密码"}>
                                               <Icon type="info-circle" id={"tooltip"} />
                                           </Tooltip>
                                   }
                                   value={this.state.password2}
                                   onChange={this.handleInforChange}
                            />{checkpassword2}<br/>
                            <Typography variant={"subtitle1"}>你的email地址</Typography>
                            <Input id={"email"}
                                   allowClear={true}
                                   suffix={
                                           <Tooltip title={"请输入正确邮箱地址"}>
                                               <Icon type="info-circle" id={"tooltip"} />
                                           </Tooltip>
                                   }
                                   value={this.state.email}
                                   onChange={this.handleInforChange}
                            />{checkemail}<br/>
                            {button}
                        </Grid>
                        <br/>
                    </Grid>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Divider type={"vertical"} id={"divider"}/>
                </Grid>
                <Grid item xs={4}>
                    <div id={"register-body"}>
                    <Grid container spacing={1}>
                        <Grid item xs={8} >
                            <Typography variant={"subtitle1"} component="h4">已有账户？</Typography><br/>
                            <Link to={"/loginpage"}><Button variant="outlined" color="primary" > 去登录</Button></Link><br/>
                            <br/><br/>
                            <Typography variant={"subtitle1"} component="h4">忘记密码？</Typography><br/>
                            <Link to={"/resetpassword"}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    name={"resetPassword"} >
                                    重置密码
                                </Button>
                            </Link>
                            <br/><br/><br/><br/>
                        </Grid>
                        <Grid item xs={2} />
                        <br/>
                    </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
export default Register;