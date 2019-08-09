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
import {Input} from "antd";

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
        this.state={
            name:""
        }
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
            <Grid container className={useStyles.root} justify={"center"} alignContent={"center"}>
                <Grid item xs={8}>
                    <br/><br/><br/>
                    <Grid container justify={"center"} alignContent={"center"}>
                    <Typography variant={"h4"} component="h4">登录至Bamdb</Typography>
                    <Grid item xs={12}>
                        <br/><br/>
                        <Breadcrumbs separator="/" aria-label="Breadcrumb">
                        <Link to={"/login"}>
                            <Typography variant={"subtitle2"} color="textSecondary">登录</Typography>
                        </Link>
                        <Typography variant={"subtitle1"} color="primary">忘记密码</Typography>
                        </Breadcrumbs>
                        <Grid container >
                        <Grid item xs={3}/>
                        <Grid item xs={6}><br/><br/>
                            <Typography variant={"h6"} color="textPrimary">请输入用户名</Typography>
                            <Input id={"name"}
                                   allowClear={true}
                                   value={this.state.name}
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
            </Grid>
        )
    }
}

export default Resetpwdpage;