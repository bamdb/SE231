import React, {Component} from 'react';
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

    render() {
        return(
            <div className={useStyles.root} >

                <Grid item xs={3} container spacing={1} justify={"center"} alignContent={"center"} >
                    <Paper className={useStyles.root}>
                        <Grid item xs={3}>
                        <Typography variant={"h4"} component="h4" >注册成为Bamdb会员</Typography> <br/>
                        <Typography component="p">你的email地址</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"email"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                        <Typography component="p">输入密码</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                        </Grid>
                        <Grid item xs={3}>
                        <Button variant="outlined" color="primary" className={useStyles.button}  name={"submit"}>注册</Button><br/>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={useStyles.paper}>
                        <Typography variant={"h5"} component="h4">已经注册过Bamdb账号？</Typography><br/>
                        <Button variant="outlined" color="primary" className={useStyles.button} Link to="/login/">去登录</Button><br/>
                        <Typography variant={"h5"} component="h4">忘记密码？</Typography><br/>
                        <Button variant="outlined" color="primary" className={useStyles.button} onClick={this.handlePassword} name={"resetPassword"} >重置密码</Button>
                    </Paper>
                </Grid>

            </div>
        );
    }
}
export default Register;