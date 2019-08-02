import React,{Component} from "react";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import  axios from "axios";
import Typography from "antd/es/typography/Typography";
import {List} from "antd";
import { Radio } from 'antd';
import Alert from '../component/alert';

class Addrelation extends Component
{
    constructor(props)
    {
        super(props);
        this.state={id:1,type:1,item:{},prev:[],normal:[],prior:[],content:[]}
        this.handleidchange=this.handleidchange.bind(this);
        this.handletyepchange=this.handletyepchange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.handledelete=this.handledelete.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
    }
    componentDidMount() {
        axios.get("http://202.120.40.8:30741/item/id/"+this.props.itemid).then(
            function(res){
                this.setState({prev:res.data.relationPrior,prior:res.data.relationSubsequent,normal:res.data.relationNormal});

            }.bind(this)
        )
    }

    handleAlert(){
        this.setState({content:""})
    }
    handledelete(id1,id2)
    {
        axios.delete("http://202.120.40.8:30741/item/delete/relation",{params:{itemId:id2,relatedItemId:id1}}).then(
            function(res){

            }
        )
    }

    handlesubmit()
    {
        switch(this.state.type)
        {
            case 1:axios.post("http://202.120.40.8:30741/item/add/relation",{},{params:{priorId:this.props.itemid,subsequentId:this.state.id,relateType:0}}).then(
                function(res)
                {
                   this.setState({content:"success!"})
                }
            );
            break;
            case 2:axios.post("http://202.120.40.8:30741/item/add/relation",{},{params:{priorId:this.state.id,subsequentId:this.props.itemid,relateType:1}}).then(
                function(res)
                {
                    this.setState({content:"success!"})
                }
            );
            break;
            case 3:axios.post("http://202.120.40.8:30741/item/add/relation",{},{params:{priorId:this.props.itemid,subsequentId:this.state.id,relateType:1}}).then(
                function(res)
                {
                    this.setState({content:"success!"})
                }
            );
            break;
        }

    }
    handleidchange(e)
    {
        this.setState({id:e.target.value})
    }
    handletyepchange(e)
    {
        this.setState({type:e.target.value})
    }

    render()
    {


        return(
            <Grid container>

                <Grid item xs={12}>
                    <Typography>续作</Typography>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.prev}
                        renderItem={item => (
                            <List.Item  >
                                <List.Item.Meta

                                    title={<Typography>{item.id+" "+item.itemname}</Typography>}

                                />
                            </List.Item>
                        )}
                    />
                    <Typography>前作</Typography>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.prior}
                        renderItem={item => (
                            <List.Item >
                                <List.Item.Meta

                                    title={<Typography>{item.id+" "+item.itemname}</Typography>}

                                />
                            </List.Item>
                        )}
                    />
                    <Typography>普通关联</Typography>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.normal}
                        renderItem={item => (
                            <List.Item >
                                <List.Item.Meta

                                    title={<Typography>{item.id+" "+item.itemname}</Typography>}

                                />
                            </List.Item>
                        )}
                    />
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="id">relateditemid</InputLabel>
                    <Input type="text"  value={this.state.id} onChange={this.handleidchange}></Input>
                </FormControl>
                    <Radio.Group onChange={(e)=>{this.setState({type:e.target.value})}} value={this.state.type}>
                        <Radio value={1}>普通关联</Radio>
                        <Radio value={2}>前作</Radio>
                        <Radio value={3}>续作</Radio>
                    </Radio.Group>
                    <Button onClick={this.handlesubmit}>
                        submit
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
export default  Addrelation;
