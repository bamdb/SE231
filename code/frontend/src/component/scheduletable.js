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
            readstat:[0,1,0,1,1,0],
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
            if(readdata[i].length===undefined) //下面没有子章节了
            {
                if(readdata[i]===1) {
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
                this.transform(children,readdata[i], parenttitle, parentvalue, value);
                tree.push({
                    title:  "Node"+ parentTitle +'-'+ (i + 1).toString(),
                    value: parentvalue,
                    done: false,
                    children:children
                });
            }

        }
    }
    componentWillMount() {
        var treeData = [];
        var value=[];
        const data=this.props.readstat;
        this.transform(treeData,data,'','0',value);
        this.setState({
            treeData:treeData,
            value:value
        })
    }

    onChange = value => {
        console.log(value);
        this.setState({
            value:value });
    };

    componentDidMount() {
        if(this.props.readstat!==null)
        {
            this.setState({readstat:this.props.readstat,itemname:this.props.itemname})
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
                    onOk={this.handleClose}
                    onCancel={this.handleClose}
                >
                    <Typography>
                            点击下方按钮修改当前进度
                    </Typography>
                    <TreeSelect {...tProps} />
                </Modal>

            </Card>
        )

        /*
        if(!this.state.show){
            return(
                <div >
                    <Paper id={"tagmain"}>
                        {item}
                    </Paper>
                </div>
            )
        }

        else if(!readstat[this.state.current].length>0){
            var style={"position":"absolute"};
            style["top"]=this.state.y;
            style["left"]=this.state.x;
            return(
                <div >
                    <Paper id={"tagmain"}>
                        {item}
                        <div style={style}>
                            <Paper id={"detail"}>
                                <Typography paragraph>
                                    small introduction
                                </Typography>
                                <Button onClick={this.handleclickhas}>
                                    看过
                                </Button>
                                <Button onClick={this.handleclickhasnot}>
                                    没看过
                                </Button>
                            </Paper>
                        </div>
                    </Paper>
                </div>
            )
        }
        else
        {
            var style={"position":"absolute"};
            style["top"]=this.state.y;
            style["left"]=this.state.x;
            var items1=[];
            for(var i=0;i<readstat[this.state.current].length;++i)
            {
                if(readstat[this.state.current][i]==0) {

                    items1.push(
                        <button  id={i} class="type1" onClick={this.handleclick1}>{i}</button>
                    );

                }
                else{
                    items1.push(
                        <button  id={i} class="type2" onClick={this.handleclick1}>{i}</button>
                    );
                }
            }
            if(!this.state.show1 ) {
                return(
                    <div >
                        <Paper id={"tagmain"}>
                            {item}
                            <div style={style}>
                                <Paper id={"detail"}>
                                    <Grid>
                                        {items1}
                                    </Grid>
                                </Paper>
                            </div>
                        </Paper>
                    </div>
                )
            }
            else{
                var style1={"position":"absolute"};
                style1["top"]=this.state.y1;
                style1["left"]=this.state.x1;
                return(
                    <div >
                        <Paper id={"tagmain"}>
                            {item}
                            <div style={style}>
                                <Paper id={"detail"}>
                                    <Grid>
                                        {items1}
                                    </Grid>
                                </Paper>

                            </div>
                        </Paper>
                        <div style={style1}>
                            <Paper id={"detail"}>
                                <Typography paragraph>
                                    small introduction
                                </Typography>
                                <Button onClick={this.handleclickhas1}>
                                    看过
                                </Button>
                                <Button onClick={this.handleclickhasnot1}>
                                    没看过
                                </Button>
                            </Paper>
                        </div>
                    </div>
                )
            }
        }
         */


    }
}
export default Scheduletable;