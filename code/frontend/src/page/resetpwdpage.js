import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navigation from "../component/navigation";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        textAlign: "center"
    },
    textField: {
        textAlign: "center"

    },
}))

class Resetpwdpage extends Component{
    constructor(props){
        super(props);
        this.handleInforChange = this.handleInforChange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(value){

    }

    handleInforChange(e){
        let o= {};
        o[e.target.name]=e.target.value;
        this.setState(o);
    }

    render(){
        return(
            <Grid container spacing={2}>
                <Navigation/>
                <Grid item xs={2}/>
                <Grid item xs={8} >

                    <Grid container spacing={2} alignItems={"center"} alignContent={"center"}>
                        <Grid item xs={12}>
                            <br/><br/><br/><br/><br/><br/>
                            <Breadcrumbs separator="/" aria-label="Breadcrumb">
                            <Link to={"/loginpage"}>
                                <Typography variant={"subtitle2"} color="textSecondary">登录</Typography>
                            </Link>
                            <Typography variant={"subtitle1"} color="textPrimary">忘记密码</Typography>
                            </Breadcrumbs>
                        <Grid />
                        <Grid container >
                        <Grid item xs={3}/>
                        <Grid item xs={6}><br/><br/><br/>
                            <Typography variant={"h6"} color="textPrimary">请输入注册手机号或邮箱账号</Typography>
                            <TextField
                                className={useStyles.textField}
                                label="电话号码/注册邮箱"
                                type="text"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInforChange}
                                />
                                <br/>
                            <Button variant={"outlined"} className={useStyles.button} >确认</Button>
                        </Grid>
                        <Grid item xs={3} />
                        </Grid>
                    </Grid>

                </Grid>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        )
    }
}

export default Resetpwdpage;