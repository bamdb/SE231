import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import '../css/userinfo.css'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
/*
信息保存在state中，可以自行添加props或ajax
*/



class UserInfo extends Component
{
    constructor(props) {
        super(props);
        this.state={edit:false,username:"shenruien",password:"123456",email:"123456@qq.com",id:"1",date:"2019-7-1",grade:"1"};
        this.handleedit=this.handleedit.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesave=this.handlesave.bind(this);
        this.handlecancel=this.handlecancel.bind(this);
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    handleedit(){
        this.setState({edit:true});
    }
    handlesave(e){
        /*data of the image*/
        var imgdata=e.target.files[0];
        var email=this.state.email;
        var s=email.split("@");
        if(s.length!==2) {
            alert("wrong format of email")
        }
        else if(s[1].split(".").length<2) {
            alert("wrong format of email")
        }
        else {
            this.setState({edit:false});
        }

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


    render(){
        if(!this.state.edit){
            return(
                <div id="itemroot">
                    <Paper id={"userinfomain"}>
                        <div id={"left"}>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Remy Sharp" src="/img/3.jpg" id={"avatar"} />

                            </Grid>
                        </div>
                        <div id={"right"}>
                            <div id={"right-part"}>
                                <List >
                                    <ListItem id={"li"}>
                                        <ListItemText primary="用户名" secondary={this.state.username} />
                                    </ListItem>
                                    <ListItem id={"li"}>
                                        <ListItemText primary="ID" secondary={this.state.id} />
                                    </ListItem>
                                    <ListItem id={"li"}>
                                        <ListItemText primary="邮箱" secondary={this.state.email} />
                                    </ListItem>
                                </List>
                            </div>
                            <div id={"right-part"}>
                                <List>
                                    <ListItem id={"li"}>
                                        <ListItemText primary="等级" secondary={this.state.grade}></ListItemText>
                                    </ListItem>
                                    <ListItem id={"li"}>
                                        <ListItemText primary="注册日期" secondary={this.state.date}></ListItemText>
                                    </ListItem>

                                </List>
                            </div>
                        </div>
                        <div id={"bottom"}>
                            <Button id="button" onClick={this.handleedit} variant="contained" color="primary">edit user information</Button>
                        </div>
                    </Paper>
                </div>
            )
        }
        else{
            return(
                <div id="itemroot">
                    <Paper id={"userinfomain"}>
                        <div id={"left"}>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Remy Sharp" src="/img/3.jpg" id={"avatar"} />

                            </Grid>
                            <Input type={"file"}/>
                        </div>
                        <div id={"right"}>
                            <div id={"right-part"}>
                                <List >
                                    <ListItem>
                                        <FormControl margin="normal" required fullWidth>

                                            <InputLabel htmlFor="id">username</InputLabel>
                                            <Input type="text" id="username" value={this.state.username} onChange={this.handlechange}></Input>
                                        </FormControl>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="ID" secondary="1" />
                                    </ListItem>
                                    <ListItem>
                                        <FormControl margin="normal" required fullWidth>

                                            <InputLabel htmlFor="id">email</InputLabel>
                                            <Input type="text" id="email" value={this.state.email} onChange={this.handlechange}></Input>
                                        </FormControl>
                                    </ListItem>
                                </List>
                            </div>
                            <div id={"right-part"}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="等级" secondary={this.state.grade}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="注册日期" secondary={this.state.date}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <FormControl margin="normal" required fullWidth>

                                            <InputLabel htmlFor="id">password</InputLabel>
                                            <Input type="text" id="password" value={this.state.password} onChange={this.handlechange}></Input>
                                        </FormControl>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                        <div id={"bottom"}>
                            <Button id="button" onClick={this.handlesave} variant="contained" color="primary">save</Button>
                            <Button id="button" onClick={this.handlecancel}variant="contained" color="primary">cancel</Button>
                        </div>
                    </Paper>
                </div>
            )
        }

   }
}
export default UserInfo;
