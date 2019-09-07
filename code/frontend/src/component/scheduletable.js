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
            delete:false,
            treeData:[],
            completed:35,
            current:0,
            current1:-1,
            value: [],
            itemname: ""};
        this.handleClose = this.handleClose.bind(this);
        this.showEditBar = this.showEditBar.bind(this);
        this.transform = this.transform.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(){

    }
    showEditBar(){
        this.setState({
            show:true,
        })
    }

    handleClose(){
        this.setState({
            show:false,
            delete:false
        })
    }

    transform(tree, readdata, parentTitle,parentValue, value){

        const length=readdata.length;
        for (var i=0;i<length;++i){
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
        var rows=[];
        rows={
            itemId:this.props.itemid,
            userId:localStorage.getItem("userid"),
            chapters:this.state.data
        }

        axios.put("https://api.bamdb.cn/activity/update/progress",rows,{
            params:{},
            headers:{"Content-Type":'application/json'}
        })
        this.setState({show:false});
    }
    componentWillMount() {
        var treeData = [];
        var value=[];


        axios.get("https://api.bamdb.cn/activity/progress", {params:{
                    userId:localStorage.getItem("userid"),
                    itemId:this.props.itemid,

                }}).then(function(response)
            {
                //this.transform(treeData,response.data.chapters,'','0',value);
                const readdata=response.data.chapters;
                const length = (readdata===undefined) ? 0 :readdata.length ;
                for (var i=0;i<length;++i){
                    if(readdata[i].sections.length==0) //下面没有子章节了
                    {
                        if(readdata[i].finish==true) {
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
                            if(sections[j]==true) {
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
                this.setState({
                data: readdata,
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
                const length=node[item.split('-')[1]].sections.length;
                for(var i=0; i<length; i++)
                    node[item.split('-')[1]].sections[i]=false;
                node[item.split('-')[1]].finish=false;
            }
            else {
                node[item.split('-')[1]].sections[item.split('-')[2]] = false;
            }
        }

        let b = new Set([...newset].filter(x => !intersectionSet.has(x)));
        for (let item of b.values()) {
            if(item.split('-')[2]===undefined) {
                const length=node[item.split('-')[1]].sections.length;
                for(var i=0; i<length; i++)
                    node[item.split('-')[1]].sections[i]=true;
                node[item.split('-')[1]].finish=true;
            }
            else {
                node[item.split('-')[1]].sections[item.split('-')[2]] = true;
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
                    image={this.props.imgurl.substring(0, 4) == "http"? this.props.imgurl : "http://"+this.props.imgurl}
                />
                <CardContent >
                        {this.props.itemname}
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
                <Modal
                    visible={this.state.delete}
                    onYes={this.delete}
                    onCancel={this.handleClose}
                >
                    Are you sure delete this item ?
                </Modal>
            </Card>
        )
    }
}
export default Scheduletable;
