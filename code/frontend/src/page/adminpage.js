import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index';
import {Menu, Icon, List, Table} from "antd";
import  axios from "axios";
import Usermanage from "../component/usermanage";

class Adminpage extends Component{
    constructor(props){
        super(props);
        this.state={
            userid:1,username:"",password:"",email:"",imgurl:"",role:"",
            //记录操作种类 1-对用户进行操作，eg.封禁   2-对举报内容进行操作
            current: 'user',
        };
        this.handlesearch=this.handlesearch.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.submit=this.submit.bind(this);
        this.handleMenu = this.handleMenu.bind(this);

    }

    handleMenu(e) {
        this.setState({current:e.key})
    }
    submit()
    {

        axios.put("https://api.bamdb.cn/auth/update/"+this.state.username,{},{params:{id:this.state.id,mail:this.state.email,password:this.state.password}}).then(
            function(res)
            {
                alert("success");
            }
        )
        if(this.state.role!="")
        {
            axios.post("https://api.bamdb.cn/auth/grant/role/"+this.state.role,{},{params:{username:this.state.username,operation:"+"}});
        }
    }

    componentWillMount() {
        if(localStorage.getItem("role")!="ROLE_ADMIN") {
            alert("无权限");
            window.history.go(-1);  //非管理员自动回退上一页面
        }
        /*axios.get("https://api.bamdb.cn/auth/id/"+this.state.userid+"?access_token="+localStorage.getItem("access_token")).then(
            function(res){
                this.setState({userinfo:res.data});
            }.bind(this)
        )*/
    }

    handlechange(e)
    {
        var id=e.target.id;
        switch(id)
        {
            case "username":this.setState({username:e.target.value});break;
            case "password":this.setState({password:e.target.value});break;
            case "email":this.setState({email:e.target.value});break;
            case "imgurl":this.setState({imgurl:e.target.value});break;
            case "userid":this.setState({userid:e.target.value});break;
            case "role":this.setState({role:e.target.value});break;
        }

    }

    handlesearch(){
        axios.get("https://api.bamdb.cn/auth/id/"+this.state.userid).then(
            function(res)
            {
                this.setState({username:res.data.username||"",email:res.data.mail||"",imgurl:res.data.imgUrl||""});
            }.bind(this)
        )
    }

    render(){
        const {current} = this.state;
        const users = (current=='user') ? <Usermanage /> : <span/>;
        return(
            <Grid container alignItems={"flex-start"}>
                <Menu onClick={this.handleMenu} selectedKeys={current} mode="horizontal">
                    <Menu.Item key={'user'}>管理用户</Menu.Item>
                    <Menu.Item key={'complain'}>举报内容</Menu.Item>

                </Menu>
                <Grid item xs={12}>
                {users}
                </Grid>
            </Grid>
        )
    }
}

export  default Adminpage;

/*

                <Grid item xs={6}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Button onClick={this.handlesearch} variant={"contained"} color={"primary"}>查询</Button>
                </Grid>
                <Grid item xs={3}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">username</InputLabel>
                        <Input type="text" id="username" value={this.state.username} onChange={this.handlechange}></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">password</InputLabel>
                        <Input type="text" id="password" value={this.state.password} onChange={this.handlechange}></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">email</InputLabel>
                        <Input type="text" id="email" value={this.state.email} onChange={this.handlechange}></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">role</InputLabel>
                        <Input type="text" id="role" value={this.state.role} onChange={this.handlechange}></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={this.submit}>
                        提交
                    </Button>
                </Grid>
 */