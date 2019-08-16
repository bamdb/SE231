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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Tag from "./tag";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import  axios from "axios";
import Rating from "./rating";


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

class Collectform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            status : 0,
            content: "",
            tags:[],
            text:"",
            score:5,
            yourtags:[],
            userid:localStorage.getItem("userid")
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleadd=this.handleadd.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
        this.handlescorechange=this.handlescorechange.bind(this);
        this.tagchange=this.tagchange.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        var tagnames=[];
        var yourtagnames=[];
        if(nextProps.itemid!=undefined) {
            /*
            var url5 = "http://202.120.40.8/item/tag/id/" + nextProps.itemid;
            axios.get(url5).then(
                function (response) {
                    console.log(response.data);
                    response.data.tags.map(tag => {
                        tagnames.push(tag.tagname);
                        yourtagnames.push(tag.tagname);
                    })
                }.bind(this)
            )

             */
            this.setState({
                /*
                tags: tagnames,
                yourtags: yourtagnames,

                 */
                userid: localStorage.getItem("userid"),
                visible: nextProps.visible
            })

        }
    }

    handlescorechange(score)
    {
        this.setState({score:score});
    }
    handletextchange(e)
    {
        this.setState({text:e.target.value});
    }
    handleadd(e)
    {
        var yourtags=this.state.yourtags;

        console.log(this.state.tags);
        console.log(this.state.yourtags);
        yourtags.push(this.state.text);

        console.log(this.state.tags);

        this.setState({yourtags:yourtags});
    }

    handleOk() {
        this.setState({
            visible: false
        });
        var date = Date.parse(new Date());
        //var yourtags=this.state.yourtags;
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        axios.post("https://api.bamdb.cn/activity/add",{actTime:date,actType:this.state.status,userId:this.state.userid,itemId:this.props.itemid})
            .then(function (res) {
                console.log("add activity:",res.data)
            })
            .catch(function (err) {
                console.log("add activity error!",err)
            });
        console.log(date)
        axios.post("https://api.bamdb.cn/comment/insert",{itemId:this.props.itemid,userId:localStorage.getItem("userid"),content:this.state.content,pubTime:date});

        axios.put("https://api.bamdb.cn/rating/update","success",{params:{userId:localStorage.getItem("userid"),itemId:this.props.itemid,score:this.state.score}});
        //axios.post("https://api.bamdb.cn/item/add/tag?"+"userId="+localStorage.getItem("userid")+"&itemId="+this.props.itemid,yourtags);

        var chapters=[];
        switch (this.state.status) {
            case 0: case 1:
                for(var i=0;i<this.props.chapterNum;i++)
                    chapters.push({
                        chapterNum: i,
                        finish:0,
                        sections:[],
                    });
                break;
            case 3:
                for(var i=0;i<this.props.chapterNum;i++)
                    chapters.push({
                        chapterNum: i,
                        finish:1,
                        sections:[],
                    });
                break;
            default:
                break;
        }
        if(this.state.status<=3) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token");
            axios.put("https://api.bamdb.cn/activity/update/progress",
                {userId: localStorage.getItem("userid"), itemId: this.props.itemid, chapters: chapters}
            ).then(function (res) {
                console.log("success:", res.data);
                this.props.handleCancel();
            }.bind(this));
        }

        /*$.ajax({
            url:"/item/add/tag",
            type:"POST",
            params:{access_token:localStorage.getItem("access_token"),userId:localStorage.getItem("userid"),itemId:this.props.itemid},
            data:this.state.yourtags,


        })*/
    }

    handleCancel() {
        this.props.handleCancel();
    }
    tagchange(currenttags){
        this.setState({yourtags:currenttags})
    }
    handleChange(e) {
        this.setState({status : e.target.value})
    }

    handleAlert(e) {
        this.setState({content : e.target.value})
    }

    render() {
        return (
            <Modal title="修改收藏状态" visible={this.props.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl component="fieldset" className={useStyles.formControl}>
                            <FormLabel component="legend">收藏状态</FormLabel>
                            <RadioGroup
                                aria-label="收藏状态"
                                name="status"
                                className={useStyles.group}
                                value={parseInt(this.state.status)}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="想看" />
                                <FormControlLabel value={1} control={<Radio />} label="在看" />
                                <FormControlLabel value={2} control={<Radio />} label="看过" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            简评(最多200字)
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            label="简评"
                            multiline
                            rows="5"
                            fullWidth={true}
                            className={useStyles.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleAlert}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Typography variant="subtitle1" color="textPrimary" component="p">
                    热门标签
                </Typography>
                <Tag tags={this.state.tags}/>
                <br/>
                <Typography variant="subtitle1" color="textPrimary" component="p">
                    您的标签
                </Typography>
                <Tag tags={this.state.yourtags} />
                <br/>
                <Grid container spacing={2}>
                    <Grid item xs={1}/>
                    <Grid item xs={3.5}>
                        <br/>
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            添加自定义标签：
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-search"
                            label="Search field"
                            type="search"
                            className={useStyles.textField}
                            margin="normal"
                            onChange={this.handletextchange}

                        />
                    </Grid>
                    <Grid item xs={2}>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.handleadd} className={useStyles.button}>
                            添加
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            评分：
                        </Typography>
                        <Rating handlescorechange={this.handlescorechange}></Rating>
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

export default Collectform;

