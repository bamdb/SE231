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
    },
    input: {
        display: 'none',
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
        maxWidth: 500
    },
    root:  {
        flexGrow: 1
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
            <div className={useStyles.root}>
                <Paper className={useStyles.paper} >
                <Grid className={useStyles.grid}>
                <Grid direction={"column"}>
                    <Grid item xs>
                        <Typography variant={"h4"} component="h4">登录至Bamdb</Typography> <br/>
                        <Typography component="p">你的用户名/email地址</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"name"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                        <Typography component="p">你的密码</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                    </Grid>
                    <Grid item xs>
                        <Button variant="outlined" color="primary" className={useStyles.button}  name={"submit"}>登录</Button><br/>
                    </Grid>
                </Grid>
                <Grid >
                    <Typography variant={"h5"} component="h4">没有账户？</Typography><br/>
                    <Button variant="outlined" color="primary" className={useStyles.button} ><Link to={"/register/"}> 注册新用户</Link></Button><br/>
                    <Typography variant={"h5"} component="h4">忘记密码？</Typography><br/>
                    <Button variant="outlined" color="primary" className={useStyles.button} onClick={this.handlePassword} name={"resetPassword"} >重置密码</Button>
                </Grid>
                </Grid>
                </Paper>
            </div>

        );
    }
}

export default Login;