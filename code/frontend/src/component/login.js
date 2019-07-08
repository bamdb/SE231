import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
            islogin: false,
            forgetPassword: false,
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handlePassword(){
        /* 忘记密码 */
    }

    handleInforChange(e){
        let o= {};
        o[e.target.name]=e.target.value;
        this.setState(o);
    }

    render(){
        /*
        如果登录，跳转个人主页
         */
        if(this.state.islogin===true)
            ;//    window.location.href("/* 网址 */");
        if(this.state.forgetPassword===true)
            ;//  重设密码
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
                                    <Button variant="outlined" color="primary" className={useStyles.button}  name={"submit"}>登录</Button><br/>
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
                                    <Button variant="outlined" color="primary" className={useStyles.button} href={"/#/registerpage"}> 注册新用户</Button><br/>
                                    <br/><br/>
                                    <Typography variant={"subtitle1"} component="h4">忘记密码？</Typography><br/>
                                    <Link to={"/resetpassword"}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={useStyles.button}
                                            onClick={this.handlePassword}
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