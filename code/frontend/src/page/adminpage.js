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
import * as axios from "axios";
import Button from "@material-ui/core/Button";

class Adminpage extends Component{
    constructor(props){
        super(props);
        this.state={itemname:"",pubtime:"",chapternum:"",author:"",imgurl:"",type:""};
        this.handleSearch=this.handleSearch.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    handlesubmit()
    {
        axios.post("http://202.120.40.8:30741/item/add",{itemname:this.state.itemname,pubTime:this.state.pubtime,chapterNum:this.state.chapternum,mainauthor:this.state.author,imgurl:this.state.imgurl,type:this.state.type}).then(
            function(response){
                alert("success");
            }
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
            case "imgurl":this.setState({imgurl:e.target.value});break;
            case "type":this.setState({type:e.target.value});break;
        }

    }

    handleSearch(value){

    }

    render(){
        return(
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Paper>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
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

                                <InputLabel htmlFor="id">imgurl</InputLabel>
                                <Input type="text" id="imgurl" value={this.state.imgurl} onChange={this.handlechange}></Input>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>

                                <InputLabel htmlFor="id">type</InputLabel>
                                <Input type="text" id="type" value={this.state.type} onChange={this.handlechange}></Input>
                            </FormControl>
                            <Button onClick={this.handlesubmit}variant={"contained"}color={"secondary"}>创建</Button>

                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

export  default Adminpage;