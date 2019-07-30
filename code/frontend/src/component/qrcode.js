import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/login.css';
import axios from 'axios';
import {Divider, Icon, Input, Tooltip} from "antd";

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state={
            uuid:undefined,
            QRsrc:"",
            qrcode:""
        }
    }

    componentDidMount() {
        if(this.props.uuid!==undefined)
        {
            axios.get("http://202.120.40.8:30741/auth/qrcode",this.props.uuid)
                .then(function (res) {
                    this.setState({qrcode:res.data, uuid:this.props.uuid})
                }.bind(this))
        }

        this.timer = setInterval(
            () => {
                axios.get("http://202.120.40.8:30741/auth/gettoken",{params:{uuid:this.props.uuid}})
                    .then(function (res) {
                        if(res.data.access_token!==undefined) {
                            localStorage.setItem("access_token",res.data.access_token);
                            window.location.href="/#/";
                        }
                        else console.log("wait");
                    })
            },
            1000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <Grid container alignContent={"center"} justify={"space-around"}>
                <Typography variant={"h4"} component="h4">登录至Bamdb</Typography>
                <Grid item xs={12}>
                    <Grid container alignContent={"center"} justify={"space-around"}>
                        <Grid item xs={1}/>
                        <Grid item xs={5}>
                            我也不知道二维码应该写什么
                        </Grid>
                        <Grid item xs={1}>
                            <Divider type={"vertical"} id={"divider-login"}/>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container spacing={1} justify={"center"} alignContent={"center"}>
                                <Grid item xs={12}>
                                    <br/>
                                    <Typography variant={"subtitle1"}>
                                        没有账户？<Button variant="text" color="primary" ><Link to={"/register"}>注册新用户</Link></Button></Typography><br/>
                                        <Typography variant={"subtitle1"} component="h4">忘记密码？
                                            <Button variant="text" color="primary" name={"resetPassword"} ><Link to={"/resetpassword"}>重置密码</Link></Button>
                                        </Typography>
                                </Grid>
                            </Grid>
                            <br/><br/><br/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default QRcode;