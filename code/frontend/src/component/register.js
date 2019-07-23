import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import $ from "jquery";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        textAlign:"center"
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
            islogin: false,
            forgetPassword: false,
        }
        this.handleInforChange = this.handleInforChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submit=this.submit.bind(this);
    }
    submit()
    {
        axios.post("http://202.120.40.8:30741/auth/signup",{
            username:this.state.name,
            password:this.state.password

        },
            {
                withCredentials:true
            }).then(
            function(res)
            {
                window.location.href='/#/login'
            }
        )
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
        return(
            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Paper>
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                                <Typography variant={"h4"} component="h4" >注册成为Bamdb会员</Typography> <br/>
                                <Typography variant={"subtitle1"}>你的email地址</Typography>
                                <TextField className={useStyles.textField} margin={"dense"} name={"email"} type={"text"} value={this.state.email} onChange={this.handleInforChange} /><br/>
                                <Typography variant={"subtitle1"}>你的用户名</Typography>
                                <TextField className={useStyles.textField} margin={"dense"} name={"name"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                                <Typography variant={"subtitle1"}>输入密码</Typography>
                                <TextField className={useStyles.textField} margin={"dense"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={useStyles.button}
                                    name={"submit"}
                                    onClick={this.submit}
                                ><Link to={"/"}>注册</Link>
                                </Button>
                                <br/>
                            </Grid>
                            <br/>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper >
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
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
export default Register;