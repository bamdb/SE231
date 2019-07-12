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

class Addmessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            to:0,
            visible:false,
            tolist:[]
        };
        this.showModal = this.showModal.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    handleOk()
    {
        var date = Date.parse(new Date())

        axios.post("http://202.120.40.8:30741/message/add",{senderId:1,receiverId:2,senTime:date,content:this.state.text});
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
        this.setState({
            visible: true
        })
    }
    componentWillMount() {
        axios.get('http://202.120.40.8:30741/friend/all/userid/1').then(
            function(response){
                this.setState({tolist:response.data})
            }.bind(this)
        )
    }

    render() {
        var rows=[];
        for(var i=0;i<this.state.tolist.length;++i)
        {
            rows.push(
                <MenuItem value={this.state.tolist[i].id}>{this.state.tolist[i].username}</MenuItem>
            )
        }
        return (
            <div>
                <IconButton aria-label="Add to favorites" onClick={this.showModal}>
                    添加
                    <Avatar src={"/img/add.svg"}/>
                </IconButton>
                <Modal title="发送私信" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="age-label-placeholder">
                                Age
                            </InputLabel>
                            <Select
                                value={this.state.to}
                                onChange={this.handlechange}
                                input={<Input name="age" id="age-label-placeholder" />}

                                name="age"
                            >

                                {rows}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel shrink htmlFor="age-label-placeholder">
                                内容
                            </InputLabel>
                            <TextField value={this.state.text} onChange={this.handletextchange} >

                            </TextField>
                        </Grid>

                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default Addmessage;

