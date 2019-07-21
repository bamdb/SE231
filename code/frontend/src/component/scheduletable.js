import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TreeSelect } from "antd";
import { Modal, Button } from 'antd';
import axios from "axios";

const useStyle = makeStyles({
    img:{
        width:100,
    },
    card: {
        maxWidth: 345,
        height:100
    },
})

class Scheduletable extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            show:false,
            treeData:[],
            completed:35,
            current:0,
            current1:-1,
            value: [],
            show1:false,
            itemname: ""};
        this.handleClose = this.handleClose.bind(this);
        this.showEditBar = this.showEditBar.bind(this);
        this.transform = this.transform.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    showEditBar(){
        this.setState({
            show:true,
        })
    }

    handleClose(){
        this.setState({
            show:false,
        })
    }

    transform(tree, readdata, parentTitle,parentValue, value){

        const length=readdata.length;
        console.log(length);
        for (var i=0;i<length;++i){
            console.log("child",readdata[i].length)
            if(readdata[i].sections.length===0) //下面没有子章节了
            {
                if(readdata[i].finish===1) {
                    tree.push({
                        title: "Node"+ parentTitle +'-'+ (i + 1).toString(),
                        value: parentValue + '-' + i.toString(),
                        done: true
                    });
                    value.push(parentValue + '-' + i.toString());
                }
                else
                    tree.push({
                        title: "Node"+ parentTitle +'-'+ (i + 1).toString(),
                        value: parentValue+'-'+i.toString(),
                        done: false
                    });

            }
            else {
                const parenttitle = parentTitle +'-'+ (i + 1).toString()
                const parentvalue=parentValue+'-'+i.toString()
                var children=[];
                var read=true;
                const sections=readdata[i].sections;
                for(var j=0;j<sections.length;j++)
                    if(sections[j]==1) {
                        children.push({
                            title: "Node"+ parenttitle +'-'+ (j + 1).toString(),
                            value: parentvalue + '-' + j.toString(),
                            done: true
                        });
                        value.push(parentvalue + '-' + j.toString());
                    }
                    else {
                        children.push({
                            title: "Node" + parenttitle + '-' + (j + 1).toString(),
                            value: parentvalue + '-' + j.toString(),
                            done: false
                        });
                        read = false;
                    }
                tree.push({
                    title:  "Node"+ parentTitle +'-'+ (i + 1).toString(),
                    value:parentValue + '-' + i.toString(),
                    done:read,
                    children:children
                });
            }
        }
    }

    submit(){
        axios.put("http://202.120.40.8:30741/activity/update/progress",{params:{
            access_token: localStorage.getItem("access_token"),
            body:this.state.data
            }})
        this.setState({show:false});
    }
    componentWillMount() {
        var data=[];
        var treeData = [];
        var value=[];
        axios.get("http://202.120.40.8:30741/activity/progress", {params:{
                    userId:this.props.userid,
                    itemId:this.props.itemid,
                    access_token: localStorage.getItem("access_token"),
                }}).then(function(response)
            {
                console.log(response.data);
                console.log(response.data.chapters);
                //this.transform(treeData,response.data.chapters,'','0',value);
                const readdata=response.data.chapters;
                const length=readdata.length;

                for (var i=0;i<length;++i){
                    console.log("child",readdata[i].sections.length)
                    if(readdata[i].sections.length===0) //下面没有子章节了
                    {
                        if(readdata[i].finish===1) {
                            treeData.push({
                                title: "Node" +'-'+ (i + 1).toString(),
                                value: '0-' + i.toString(),
                                done: true
                            });
                            value.push('0' + '-' + i.toString());
                        }
                        else
                            treeData.push({
                                title: "Node" +'-'+ (i + 1).toString(),
                                value: '0'+'-'+i.toString(),
                                done: false
                            });

                    }
                    else {
                        const parenttitle = '-'+ (i + 1).toString()
                        const parentvalue='0'+'-'+i.toString()
                        var children=[];
                        var read=true;
                        const sections=readdata[i].sections;
                        for(var j=0;j<sections.length;j++)
                            if(sections[j]==1) {
                                children.push({
                                    title: "Node"+ parenttitle +'-'+ (j + 1).toString(),
                                    value: parentvalue + '-' + j.toString(),
                                    done: true
                                });
                                value.push(parentvalue + '-' + j.toString());
                            }
                            else {
                                children.push({
                                    title: "Node" + parenttitle + '-' + (j + 1).toString(),
                                    value: parentvalue + '-' + j.toString(),
                                    done: false
                                });
                                read = false;
                            }
                        treeData.push({
                            title:  "Node" +'-'+ (i + 1).toString(),
                            value:'0' + '-' + i.toString(),
                            done:read,
                            children:children
                        });
                    }
                }
                console.log(treeData);
                this.setState({
                data: response.data,
                treeData:treeData,
                value:value
            })
            }.bind(this))

    }

    onChange = value => {

        let oldset = new Set(this.state.value);
        let newset = new Set(value);

        let intersectionSet = new Set([...oldset].filter(x => newset.has(x)));

        let a = new Set([...oldset].filter(x => !intersectionSet.has(x)));
        var node = this.state.data;
        for (let item of a.values()) {
            if(item.split('-')[2]===undefined) {
                const length=node.chapters[item.split('-')[1]].sections.length;
                for(var i=0; i<length; i++)
                    node.chapters[item.split('-')[1]].sections[i]=0;
                node.chapters[item.split('-')[1]].finish=0;
            }
            else {
                node.chapters[item.split('-')[1]].sections[item.split('-')[2]] = 0;
            }
        }

        let b = new Set([...newset].filter(x => !intersectionSet.has(x)));
        for (let item of b.values()) {
            if(item.split('-')[2]===undefined) {
                const length=node.chapters[item.split('-')[1]].sections.length;
                for(var i=0; i<length; i++)
                    node.chapters[item.split('-')[1]].sections[i]=1;
                node.chapters[item.split('-')[1]].finish=1;
            }
            else {
                node.chapters[item.split('-')[1]].sections[item.split('-')[2]] = 1;
            }
        }
        this.setState({
            data:node,
            value:value
        })
    };

    componentDidMount() {
        if(this.props.itemname!==null)
        {
            this.setState({itemname:this.props.itemname})
        }
    }

    render() {
        const treeData = this.state.treeData;
        const { SHOW_PARENT } = TreeSelect;
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: "Please select",
            style: {
                width: 300
            }
        };
        return (
            <Card className={useStyle.card} style={{width:150}}>
                <CardActionArea onClick={this.showEditBar}>
                <CardMedia
                    style={{height:120}}
                    className={useStyle.media}
                    image={"img/3.jpg"}
                />
                <CardContent >
                        {this.state.itemname}
                    <LinearProgress variant="determinate" value={this.state.completed} />
                </CardContent>
                </CardActionArea>
                <Modal
                    title="进度编辑"
                    visible={this.state.show}
                    onOk={this.submit}
                    onCancel={this.handleClose}
                >
                    <Typography>
                            点击下方按钮修改当前进度
                    </Typography>
                    <TreeSelect {...tProps} />
                </Modal>
            </Card>
        )
    }
}
export default Scheduletable;