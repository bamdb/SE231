import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import * as axios from "axios";
import Button from "@material-ui/core/Button";
import Uploadavatar from "./uploadavatar";

class Edititem extends Component{
    constructor(props){
        super(props);
        this.state={itemname:"",pubtime:"",chapternum:"",author:"",imgurl:"",type:"",itemid:0,submit:false,update:false};
        this.handleSearch=this.handleSearch.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.handlequery=this.handlequery.bind(this);
    }

    handlesubmit(e)
    {
        if (this.state.update==false) {
            console.log("add")
            var pubtime = Date.parse(new Date(this.state.pubtime))
            axios.post("http://202.120.40.8:30741/item/add?access_token=" + localStorage.getItem("access_token"), {
                itemname: this.state.itemname,
                pubTime: pubtime,
                chapterNum: this.state.chapternum,
                imgurl: null,
                mainAuthor: this.state.author,
                type: this.state.type
            }).then(
                function (response) {
                    this.props.setid(response.data);
                    this.setState({submit: true});
                }.bind(this)
            )
        }else if (this.state.update==true) {
            console.log("update")
            var pubtime = Date.parse(new Date(this.state.pubtime))
            axios.put("http://202.120.40.8:30741/item/update?access_token=" + localStorage.getItem("access_token"), {
                id: this.state.itemid,
                itemname: this.state.itemname,
                pubTime: pubtime,
                chapterNum: this.state.chapternum,
                imgurl: null,
                mainAuthor: this.state.author,
                type: this.state.type
            }).then(
                function (response) {
                    this.props.setid(response.data);
                    this.setState({submit: true});
                }.bind(this)
            )
        }
    }


    handlequery()
    {
        axios.get("http://202.120.40.8:30741/item/id/"+this.state.itemid).then(
            function(response){
                if (response.data != null) {
                    this.setState({update:true,itemname:response.data.itemname,pubtime:response.data.pubTime,chapternum:response.data.chapterNum,author:response.data.mainAuthor,imgurl:response.data.imgurl,type:response.data.type});
                }
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
            case "itemid":this.setState({itemid:e.target.value});break;
        }

    }

    handleSearch(value){

    }

    render(){
        // after editor submit, all button disappear
        const buttonname = this.state.update==true ? "更新" : "创建";
        const buttonarea = this.state.submit==true ? (
            <div/>
        ) : (
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <Button onClick={this.handlesubmit}variant={"contained"}color={"secondary"}>{buttonname}</Button>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <span>条目ID:</span>
                    <Input type="text" id="itemid" value={this.state.itemid} onChange={this.handlechange}></Input>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={this.handlequery}variant={"contained"}color={"secondary"}>查询</Button>
                </Grid>
            </Grid>
        );
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
                        </Grid>
                    </Grid>
                    {buttonarea}
                </Paper>
            </Grid>
        )
    }
}

export  default Edititem;