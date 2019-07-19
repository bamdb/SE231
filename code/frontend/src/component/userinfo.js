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
import axios from 'axios'
import $ from'jquery'
import Uploadavatar from "./uploadavatar";
/*
信息保存在state中，可以自行添加props或ajax
*/



class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state={edit:false,username:"shenruien",password:"123456",email:"123456@qq.com",id:"1",date:"2019-7-1",grade:"1"};
        this.handleedit=this.handleedit.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesave=this.handlesave.bind(this);
        this.handlecancel=this.handlecancel.bind(this);
    }
    componentDidMount() {

        axios({url: 'http://202.120.40.8:30741/user/id/1',method:'GET'})
            .then(
            function (response)
            {
                console.log(response.data);
                this.setState({username:response.data.username,password:response.data.password,email:response.data.mail})
            }.bind(this)
        )
    }



    handleedit(){
        this.setState({edit:true});
    }

    handlesave(e){
        /*data of the image*/

        var email=this.state.email;
        var s=email.split("@");
        if(s.length!==2) {
            alert("wrong format of email")
        }
        else if(s[1].split(".").length<2) {
            alert("wrong format of email")
        }
        else {

            var url='http://202.120.40.8:30741/user/update/'+this.state.username;
            this.setState({edit:false});
            $.ajax({
                url:url,
                type:"PUT",
                contentType: "application/json;charset=utf-8",
                data:{mail:this.state.email},
                success: function f(data) {

                    console.log(data);


                }.bind(this)
            })
            /*axios.put(url,{mail:this.state.email}).then(
                function (data)
                {
                    alert("success");
                }
            )*/
        }

    }
    handlecancel(){
        this.setState({edit:false});
    }
    handlechange(e){
        var kind=e.target.id;
        var filedata=$("#userimage")[0].files[0];
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

                    <Paper >
                        <Grid container >
                            <Grid item xs={3}>

                                    <Grid container justify="center" alignItems="center">
                                        <Avatar alt="Remy Sharp" src="/img/3.jpg" id={"avatar"} />

                                    </Grid>

                            </Grid>
                            <Grid item xs={9}>
                                <Grid container>

                                   <Grid item xs={6}>
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
                                   </Grid>
                                    <Grid item xs={6}>
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
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={9}>
                            <Button id="button" onClick={this.handleedit} variant="contained" color="primary">edit user information</Button>
                                <br/>
                            </Grid>
                        </Grid>
                    </Paper>

            )
        }
        else{
            return(

                    <Paper >
                        <Grid container >
                            <Grid item xs={3}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                <Avatar alt="Remy Sharp" src="/img/3.jpg" id={"avatar"} />
                                </Grid>
                                <Grid item xs={4}/>
                                <Grid item xs={8}>
                                <Uploadavatar imageid={this.state.id+"0"}></Uploadavatar>
                                </Grid>
                            </Grid>

                            </Grid>
                            <Grid item xs={9}>
                                <Grid container>

                                    <Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="等级" secondary={this.state.grade}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="注册日期" secondary={this.state.date}></ListItemText>
                                    </ListItem>

                                </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={9}>
                            <Button id="button" onClick={this.handlesave} variant="contained" color="primary">save</Button>
                            <Button id="button" onClick={this.handlecancel}variant="contained" color="primary">cancel</Button>
                            </Grid>
                            <br/>
                        </Grid>
                    </Paper>


            )
        }

   }
}
export default Userinfo;
