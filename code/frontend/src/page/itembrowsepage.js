import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index';
import axios from 'axios';
import Tags from "../component/tag";
import Listitem from '../component/listitem'
import {AutoComplete, Input, Select} from 'antd';

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="0" style={{paddingLeft:8 }}>
        <Option value="0">全部</Option>
        <Option value="1">条目</Option>
        <Option value="2">用户</Option>
    </Select>
);

class Itembrowsepage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentpage:1,
            ItemList: [],
            tags: [],
            isloaded: false,
            search:"",
            type:0,
            dataSource:[],
        };
        this.Search = this.Search.bind(this)
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlepagechange=this.handlepagechange.bind(this);
    }

    handlepagechange(currentpage)
    {
        this.setState({currentpage:currentpage});
    }

    Search(value){
        console.log("喵喵喵？？")
        const win=window.open('about:blank');
        win.location.href='/#/search/'+value;
    }
    handleSearch(value){
        var dataSource=[];
        console.log("start search");
        axios.get('http://202.120.40.8:30741/search/ik',{params:{keystring:value,page:0,size:8}})
            .then(function (res) {
                if(res.data.content!==undefined){
                    res.data.content.forEach(item=>{
                        dataSource.push(item.itemname)
                    })
                }
                this.setState({
                    search:value,
                    dataSource:dataSource
                })
                console.log("finish search")
            }.bind(this))
    }

    handletagchange(tags){
        this.setState({tags:tags});
    }

    componentWillMount() {
        var value=window.location.href.split("#")[1].split("/")[2];
        var type = 0;
        switch(value)
        {
            case "book":type=0;break;
            case "movie": type=1;break;
            case "flash": type=2;break;
        }
        this.setState({type:type})

    }

    render(){
        return(
            <Grid container id={"browser-item"}>
                <Grid item xs={9} style={{padding:20}}>
                    <Tags select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]}/>
                </Grid>
                <Grid item xs={3} style={{padding:20}}>
                    <AutoComplete
                        dataSource={this.state.dataSource}
                        onChange={value=>this.handleSearch(value)}
                        backfill={true}
                        defaultValue={"search..."}
                    >
                        <Input.Search addonBefore={selectBefore} onSearch={value=>this.Search(value)} />
                    </AutoComplete>
                </Grid>
                <Grid item xs={12} style={{padding:20}}>
                    <Listitem currentpage={this.state.currentpage} type={this.state.type} search={this.state.search} handlepagechange={this.handlepagechange}/>
                </Grid>
            </Grid>
        )
    }
}

export  default Itembrowsepage;
