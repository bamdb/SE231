import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import '../css/login.css';
import { Steps, Divider } from 'antd';

const { Step } = Steps;

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        textAlign:"center"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 500,
        textAlign:"center"
    },
    root:  {
        flexGrow: 1
    },
}));

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            email:"",
            verify:false,
            finish:false,
            islogin: false,
            forgetPassword: false,
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submit=this.submit.bind(this);
        this.toverify=this.toverify.bind(this);
    }

    toverify(){
        //开始验证

        this.setState({verify:true});

    }
    submit()
    {
        axios.post("http://202.120.40.8:30741/auth/signup",{
            username:this.state.name,
            password:this.state.password

        },
            {
                withCredentials:true
            })

        this.setState({finish:true})
        /*$.ajax({
            url:"http://202.120.40.8:30741/auth/signup",
            type:"POST",
            contentType: "application/json",
            data:JSON.stringify({username:this.state.name,
                password:this.state.password}),
            success: function f(data) {

                console.log(data);


            }.bind(this)
        })*/
    }

    handlePassword(){
        /* 忘记密码 */
    }

    handleInforChange(e){
        let o= {};
        o[e.target.name]=e.target.value;
        this.setState(o);
    }
 
    render() {
        const button= this.state.verify ? <Button
            variant="outlined"
            color="primary"
            className={useStyles.button}
            name={"submit"}
            onClick={this.submit}
        >注册
        </Button>
            : <Button
                variant="outlined"
                color="primary"
                className={useStyles.button}
                name={"toverify"}
                onClick={this.toverify}
            >开始验证
            </Button>;

        const current = this.state.verify ? (this.state.finish ? 2:1):0;
        if(current == 2) return (
            <div id="register">
                <Steps progressDot current={current}>
                    <Step title="填写信息"/>
                    <Step title="邮箱验证"/>
                    <Step title="注册完成"/>
                </Steps>
                <h2>注册已完成！</h2>
                <Button variant={"text"} ><Link to={'/'}>去登录</Link></Button>
            </div>

        )

        return(
            <div id="register" >
                <Steps progressDot current={current}>
                    <Step title="填写信息" />
                    <Step title="邮箱验证"  />
                    <Step title="注册完成"  />
                </Steps>
                <br/>
                <div id={"register-body"} >
                    <Grid container spacing={1}>
                        <Grid item xs={2}/>
                        <Grid item xs={10}>
                            <Typography variant={"h4"} component="h4" >注册成为Bamdb会员</Typography> <br/>
                            <Typography variant={"subtitle1"}>你的用户名</Typography>
                            <TextField className={useStyles.textField} margin={"dense"} name={"name"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                            <Typography variant={"subtitle1"}>输入密码</Typography>
                            <TextField className={useStyles.textField} margin={"dense"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                            <Typography variant={"subtitle1"}>你的email地址</Typography>
                            <TextField className={useStyles.textField} margin={"dense"} name={"email"} type={"text"} value={this.state.email} onChange={this.handleInforChange} /><br/>
                            {button}
                            <br/>
                        </Grid>
                        <br/>
                    </Grid>
                </div>
                <Divider type={"vertical"} />
                <div id={"register-jump"}>
                    <Grid container spacing={1}>
                        <Grid item xs={4} />
                        <Grid item xs={6} >
                            <br/><br/><br/><br/>
                            <Typography variant={"subtitle1"} component="h4">已有账户？</Typography><br/>
                            <Link to={"/loginpage"}><Button variant="outlined" color="primary" className={useStyles.button}> 去登录</Button></Link><br/>
                            <br/><br/>
                            <Typography variant={"subtitle1"} component="h4">忘记密码？</Typography><br/>
                            <Link to={"/resetpassword"}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={useStyles.button}
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
            </div>
        );
    }
}
export default Register;