import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "./navigation";
import TopItemList from "./topitemlist";
import Browserlist from "./browserlist";
import Tag from "./tag";
import Userinfo from "./userinfo";
import Commentlist from "./commentlist";
import Listitem from './listitem'
import Progressmanage from "./progressmanage";
import Login from "./login"
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import * as axios from "axios";
import Button from "@material-ui/core/Button";
import Uploadavatar from "./uploadavatar";

class Edititem extends Component{
    constructor(props){
        super(props);
        this.state={itemname:"",pubtime:"",chapternum:"",author:"",imgurl:"",type:""};
        this.handleSearch=this.handleSearch.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    componentWillMount() {
        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/#/login";
        }
    }

    handlesubmit()
    {
        var pubtime=Date.parse(new Date(this.state.pubtime))
        axios.post("http://202.120.40.8:30741/item/add?access_token="+localStorage.getItem("access_token"),{itemname:this.state.itemname,pubTime:pubtime,chapterNum:this.state.chapternum,imgurl:null,mainAuthor:this.state.author,type:this.state.type}).then(
            function(response){
                this.props.setid(response.data);
            }.bind(this)
        )
    }
    handlechange(e)
    {
        var id=e.target.id;
        switch(id)
        {
            case "itemname":this.setState({itemname:e.target.value});break;
            case "pubtime":this.setState({pubtime:e.target.value});break;
            case "chapternum":this.setState({chapternum:e.target.value});break;
            case "author":this.setState({author:e.target.value});break;
            case "type":this.setState({type:e.target.value});break;
        }

    }

    handleSearch(value){

    }

    render(){
        return(
            <Grid container spacing={10}>

                <Paper>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10} style={{padding:20}}>

                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">itemname</InputLabel>
                                <Input type="text" id="itemname" value={this.state.itemname} onChange={this.handlechange}></Input>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">pubtime</InputLabel>
                                <Input type="text" id="pubtime" value={this.state.pubtime} onChange={this.handlechange}></Input>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">chapternum</InputLabel>
                                <Input type="text" id="chapternum" value={this.state.chapternum} onChange={this.handlechange}></Input>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">author</InputLabel>
                                <Input type="text" id="author" value={this.state.author} onChange={this.handlechange}></Input>
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">type</InputLabel>
                                <Input type="text" id="type" value={this.state.type} onChange={this.handlechange}></Input>
                            </FormControl>
                            <br/>
                            <Button onClick={this.handlesubmit}variant={"contained"}color={"secondary"}>创建</Button>
                            <br/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

export  default Edititem;