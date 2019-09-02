import React, { Component } from 'react';
import '../css/userinfo.css'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import Alert from '../component/alert';
import Uploadavatar from "./uploadavatar";
/*
信息保存在state中，可以自行添加props或ajax
*/



class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state={edit:false,username:"",password:"",email:"",id:"",date:"",grade:"",imgurl:"",content:"",avater:false};
        this.handleavater = this.handleavater.bind(this)
        this.handleedit=this.handleedit.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesave=this.handlesave.bind(this);
        this.handlecancel=this.handlecancel.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
    }

    handleavater(){
        this.setState({avater:true})
    }

    handleedit(){
        this.setState({edit:true});
    }

    handlesave(e){
        /*data of the image*/
        var email=this.state.email;
        var s=email.split("@");
        if(s.length!==2) {
            this.setState({content:"邮箱格式错误，请重新填写！"})
        }
        else if(s[1].split(".").length<2) {
            this.setState({content:"邮箱格式错误，请重新填写！"})
        }
        else {

            this.setState({edit:false});

            const param = (this.state.avater) ?
                {
                    mail:this.state.email,
                    imgUrl:"https://api.bamdb.cn/image/id/"+this.state.id+"0",
                }
                :
                {
                    mail:this.state.email
                };

            axios.put('https://api.bamdb.cn/auth/update/'+this.state.username,{},{params:param});
        }

    }

    handleAlert(){
        this.setState({content:""})
    }

    handlecancel(){
        this.setState({edit:false});
    }
    handlechange(e){
        var kind=e.target.id;
        switch(kind){
            case"username":
                this.setState({username:e.target.value});
                break;
            case"password":
                this.setState({password:e.target.value});
                break;
            case"email":
                this.setState({email:e.target.value});
                break;
            default:
                break;
        }
    }


    render() {

        const upload = this.state.edit ? <Uploadavatar imageid={this.state.id + "0"} change={this.handleavater}/> : <div/>;
        const email = this.state.edit ? <FormControl>
            <InputLabel htmlFor="id">email</InputLabel>
            <Input type="text" id="email" value={this.state.email} onChange={this.handlechange}></Input>
        </FormControl> :<ListItemText primary="邮箱" secondary={this.state.email}/>
            ;

        const button= this.state.edit ?  <div>
            <Button id="button" onClick={this.handlesave} variant="contained" color="primary">save</Button>
            <Button id="button" onClick={this.handlecancel}variant="contained" color="primary">cancel</Button>
            </div> :
            <div><Button id="button" onClick={this.handleedit} variant="contained" color="primary">edit user
            information</Button></div>;

        const img = (this.state.imgurl == null) ? require('../default_avater.jpg') : "https://api.bamdb.cn/image/id/"+localStorage.getItem("userid")+"0";
        return (
            <Grid container id="userinfo">
                <Alert content={this.state.content} confirmAlert={this.handleAlert} cancelAlert={this.handleAlert} />
                <Grid item xs={3}>
                    <Grid container justify={"center"}>
                    <Avatar alt="" src={img} id={"avatar"}/>
                    <br/>
                    <div id="upload">{upload}</div>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={6}>
                            <List>
                                <ListItem id={"li"}>
                                    <ListItemText primary="用户名" secondary={this.state.username}/>
                                </ListItem>
                                <ListItem id={"li"}>
                                    {email}
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                <ListItem id={"li"}>
                                    <ListItemText primary="ID" secondary={this.state.id}/>
                                </ListItem>
                                <ListItem id={"li"}>
                                    <ListItemText primary="注册日期" secondary={this.state.date}></ListItemText>
                                </ListItem>

                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={9}>
                    {button}
                    <br/>
                </Grid>
            </Grid>
        )
    }

    componentDidMount() {

        if(localStorage.getItem("userid")!=null)
        {
            var username=localStorage.getItem("username");

            axios({url: 'https://api.bamdb.cn/auth/username/'+username,method:'GET'})
                .then(
                    function (response)
                    {
                        if(response.status === 200 )
                            this.setState({username:response.data.username,password:response.data.password,email:response.data.mail,imgurl:response.data.imgUrl,id:localStorage.getItem("userid")})
                        else this.setState({content:"请求错误，无法获取用户信息"})
                    }.bind(this)
                )
        }
    }
}
export default Userinfo;
