/*
 * 收藏
 */

import React, {Component} from "react";
import { Modal} from 'antd';
import "antd/dist/antd.css";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tag from "./tag";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Icon from "@material-ui/core/Icon";
import {Avatar} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        maxWidth : 100,
        marginLeft: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

class Addtopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
           text:"",
            to:0,
            visible:false,
            tolist:[],
            content:""
        };
        this.showModal = this.showModal.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlecontentchange=this.handlecontentchange.bind(this);
    }
    handlecontentchange(e)
    {
        this.setState({content:e.target.value});
    }
    handleOk()
    {
        var date = Date.parse(new Date())

        axios.post("https://api.bamdb.cn/topic/add",{topic:{userId:localStorage.getItem("userid"),title:this.state.text ,pubTime:date},topicContent:this.state.content},{params:{}}).then(
            function(res){
                this.setState({visible:false});
                window.location.reload();
            }.bind(this)
        )
    }
    handleCancel()
    {
        this.setState({visible:false})
    }
    handletextchange(e)
    {
        this.setState({text:e.target.value});
    }
    handlechange(e)
    {
        this.setState({to:e.target.value});
    }

    showModal(){
        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/login";
        }
        this.setState({
            visible: true
        })
    }
    componentWillMount() {

    }

    render() {

        return (
            <div>
                <IconButton aria-label="Add to favorites" onClick={this.showModal}>
                    添加
                    <Avatar src={"/img/add.svg"}/>
                </IconButton>
                <Modal title="新建讨论" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="age-label-placeholder">
                                标题
                            </InputLabel>
                            <TextField value={this.state.text} onChange={this.handletextchange} >

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="age-label-placeholder">
                                内容
                            </InputLabel>
                            <TextField value={this.state.content} onChange={this.handlecontentchange} >

                            </TextField>
                        </Grid>

                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default Addtopic;

