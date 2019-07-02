import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


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
    root:  {
        maxWidth: 650,
        padding : theme.spacing(2),
    }
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
                <div className={useStyles.root} align={"left"} width="300" >
                    <form className={useStyles.container}>
                        <Typography variant={"h4"} component="h4" >注册成为Bamdb会员</Typography> <br/>
                        <Typography component="p">你的email地址</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"email"} type={"text"} value={this.state.name} onChange={this.handleInforChange} /><br/>
                        <Typography component="p">输入密码</Typography><br/>
                        <TextField className={useStyles.textField} margin={"normal"} name={"password"} type={"password"} value={this.state.password} onChange={this.handleInforChange} /><br/>
                        <Button variant="outlined" color="primary" className={useStyles.button}  name={"submit"}>注册</Button><br/>
                    </form>
                </div>
                <div className={useStyles.root} align={"right"} width="300">
                    <Typography variant={"h5"} component="h4">已经注册过Bamdb账号？</Typography><br/>
                    <Button variant="outlined" color="primary" className={useStyles.button} Link to="/login/">去登录</Button><br/>
                    <Typography variant={"h5"} component="h4">忘记密码？</Typography><br/>
                    <Button variant="outlined" color="primary" className={useStyles.button} onClick={this.handlePassword} name={"resetPassword"} >重置密码</Button>
                </div>
            </div>
        );
    }
}
export default Register;