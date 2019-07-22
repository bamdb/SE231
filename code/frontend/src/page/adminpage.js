import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Userinfo from "../component/userinfo";
import Commentlist from "../component/commentlist";
import Listitem from '../component/listitem'
import Progressmanage from "../component/progressmanage";
import Login from "../component/login"
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import  axios from "axios";
import Button from "@material-ui/core/Button";

class Adminpage extends Component{
    constructor(props){
        super(props);
        this.state={userid:1,username:"",password:"",email:"",imgurl:""};
        this.handlesearch=this.handlesearch.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.submit=this.submit.bind(this);

    }
    submit()
    {
        axios.put("http://202.120.40.8:30741/auth/update/"+this.state.username,{},{params:{access_token:localStorage.getItem("access_token"),id:this.state.id,mail:this.state.email,password:this.state.password}}).then(
            function(res)
            {
                alert("success");
            }
        )
    }

    componentWillMount() {
        /*axios.get("http://202.120.40.8:30741/auth/id/"+this.state.userid+"?access_token="+localStorage.getItem("access_token")).then(
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
        axios.get("http://202.120.40.8:30741/auth/id/"+this.state.userid+"?access_token="+localStorage.getItem("access_token")).then(
            function(res)
            {
                this.setState({username:res.data.username,email:res.data.mail,imgurl:res.data.imgUrl});
            }.bind(this)
        )
    }

    render(){





        return(
            <Grid container spacing={10}>
                <Grid item xs={6}>
                    <br/>
                    <br/>
                    <br/>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">userid</InputLabel>
                        <Input type="text" id="userid" value={this.state.userid} onChange={this.handlechange}></Input>
                    </FormControl>
                </Grid>
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
            </Grid>
        )
    }
}

export  default Adminpage;