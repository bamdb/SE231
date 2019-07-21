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
import  axios from "axios";
import Rating from "./rating";
import $ from 'jquery'
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
            tags:["233"],
            text:"",
            score:5,
            yourtags:[],
            userid:1
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleadd=this.handleadd.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
        this.handlebuttonclick=this.handlebuttonclick.bind(this);
        this.handlescorechange=this.handlescorechange.bind(this);
        this.tagchange=this.tagchange.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
    }
    componentWillMount() {
        if(localStorage.getItem("userid")==null)
        {

        }
        else {
            this.setState({userid:localStorage.getItem("userid")})
        }
        var url5="/item/tag/id/"+this.props.itemid;
        axios.get(url5).then(
            function(response)
            {
                var tagnames=[];
                var yourtagnames=[];

                response.data.tags.map(tag=>{
                    tagnames.push(tag.tagname);
                    yourtagnames.push(tag.tagname);
                })

                this.setState({tags:tagnames,yourtags:yourtagnames})
            }.bind(this)
        )
    }

    handlescorechange(score)
    {
        this.setState({score:score});
    }
    handlebuttonclick()
    {

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
    showModal(){
        this.setState({
            visible: true
        })
    }
    handleOk() {
        this.setState({
            visible: false
        });
        var rank=[0,0,0,0,0,0,0,0,0,0];


        var date = Date.parse(new Date());
        var yourtags=this.state.yourtags;
        axios.post("/activity/add?access_token="+localStorage.getItem("access_token"),{actTime:date,actType:this.state.status,userId:this.state.userid,itemId:this.props.itemid});
        axios.post("/comment/insert?access_token="+localStorage.getItem("access_token"),{itemId:this.props.itemid,userId:this.state.userid,content:this.state.content,pubTime:date});
        axios.put("/rating/update?access_token="+localStorage.getItem("access_token"),"success",{params:{userId:this.state.userid,itemId:this.props.itemid,score:this.state.score}});
        axios.post("/item/add/tag?access_token="+localStorage.getItem("access_token")+"&userId="+localStorage.getItem("userid")+"&itemId="+this.props.itemid,yourtags)
        /*$.ajax({
            url:"/item/add/tag",
            type:"POST",
            params:{access_token:localStorage.getItem("access_token"),userId:localStorage.getItem("userid"),itemId:this.props.itemid},
            data:this.state.yourtags,


        })*/

    }
    handleCancel() {
        this.setState({
            visible: false
        })
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
            <div>
                    <IconButton aria-label="Add to favorites" onClick={this.showModal}>
                        <FavoriteIcon />
                    </IconButton>
                <Modal title="修改收藏状态" visible={this.state.visible}
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
                                    <FormControlLabel value={3} control={<Radio />} label="抛弃" />
                                    <FormControlLabel value={4} control={<Radio />} label="搁置" />
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
                                rows="8"
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
                            <Rating handlescorechange={this.handlescorechange}></Rating>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default Collectform;

