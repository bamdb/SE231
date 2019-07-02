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
            status : '想看',
            content: "",
            tags:["233"],
            text:""
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleadd=this.handleadd.bind(this);
        this.handletextchange=this.handletextchange.bind(this);
    }
    handletextchange(e)
    {
        this.setState({text:e.target.value});
    }
    handleadd(e)
    {
        var tags=this.state.tags;

        tags.push(this.state.text);
        debugger;
        this.setState({tags:tags});
    }
    showModal(){
        this.setState({
            visible: true
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    handleChange(e) {

        this.setState({status : this.state.content})
    }

    handleAlert(content) {
        this.setState({content : content})
    }
    
    render() {
        return (
            <div>
                    <IconButton aria-label="Add to favorites" onClick={this.showModal}>
                        收藏
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
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel value="想看" control={<Radio />} label="想看" />
                                    <FormControlLabel value="在看" control={<Radio />} label="在看" />
                                    <FormControlLabel value="看过" control={<Radio />} label="看过" />
                                    <FormControlLabel value="搁置" control={<Radio />} label="抛弃" />
                                    <FormControlLabel value="抛弃" control={<Radio />} label="搁置" />
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
                                className={useStyles.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        热门标签
                    </Typography>
                    <Tag/>
                    <br/>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        您的标签
                    </Typography>
                    <Tag tags={this.state.tags}/>
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
                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default Collectform;

