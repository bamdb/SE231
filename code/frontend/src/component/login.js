import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        textAlign:"center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        textAlign:"center"

    },
    paper: {
        margin: "auto",
        height: 500,
        justifyContent: "center"
    },
    root:  {
        alignItems:"center",
        alignContent: "center"
    },
}));

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            islogin: 7,
            forgetPassword: false,
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(){
        const _this = this;
        let user = {
            username: this.state.name,
            password: this.state.password,
        }
        axios.post("???",
                user)
            .then(function (res) {
                _this.setState({
                    islogin: res.data,
                })
            })
            .catch(function (error) {
                _this.setState({
                    islogin: 0,
                })
            })
    }

    handleInforChange(e){
        let o= {};
        o[e.target.name]=e.target.value;
        this.setState(o);
    }

    render(){

        var status = "";
        switch (this.state.islogin) {
            case 0:
                status="error";
                break;
            case 1:
                status="登录成功";
                break;
            case 2:
                status="密码错误";
                break;
            case 3:
                status="用户名不存在";
                break;
            case 7:
                status="";
                break;
        }
        /*
        如果登录，跳转个人主页
         */
        if(this.state.islogin === 1) {
            window.location.href("http://localhost:3000/#/");
        }
        return(
            /* 导航栏 */
            //登录部分
                <Grid container spacing={1}>
                    <Grid item xs={6} className={useStyles.root}>
                        <Paper className={useStyles.paper} >
                            <br/>
                            <Grid container >
                                <Grid item xs={2} />
                                <Grid item xs={8} >
                                    <Typography variant={"h4"} component="h4">登录至Bamdb</Typography> <br/>
                                    <Typography component="p">你的用户名/email地址</Typography><br/>
                                    <TextField className={useStyles.textField} margin={"normal"} name={"name"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                                    <Typography component="p">你的密码</Typography><br/>
                                    <TextField className={useStyles.textField} margin={"normal"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={useStyles.button}
                                        name={"submit"}
                                        onClick={this.submit}
                                    ><Link to={"/"}>登录</Link>
                                    </Button>
                                    <br/>
                                </Grid>
                                <Grid item xs={2} />
                            </Grid>
                            <br/>
                        </Paper>
                    </Grid>

                    <Grid item xs={6} className={useStyles.root}>
                        <Paper className={useStyles.paper} >
                            <br/><br/><br/>
                            <Grid container spacing={1}>
                                <Grid item xs={4} />
                                <Grid item xs={6} >
                                    <Typography variant={"subtitle1"} component="h4">没有账户？</Typography><br/>
                                    <Link to={"/registerpage"}><Button variant="outlined" color="primary" className={useStyles.button} >注册新用户</Button></Link><br/>
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
                                </Grid>
                                <Grid item xs={2} />
                            </Grid>
                            <br/><br/><br/>
                        </Paper>
                    </Grid>
                </Grid>

        );
    }
}


export default Login;