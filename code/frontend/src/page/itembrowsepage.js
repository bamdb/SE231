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
        this.Search = this.Search.bind(this);
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlepagechange=this.handlepagechange.bind(this);
    }

    handlepagechange(currentpage)
    {
        this.setState({currentpage:currentpage});
    }

    Search(value){
        const win=window.open('about:blank');
        win.location.href='/search/'+encodeURI(value);
    }
    handleSearch(value){
        var dataSource=[];
        console.log("start search");
        axios.get('https://api.bamdb.cn/search/ik',{params:{keystring:value,page:0,size:8}})
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

    render(){
        var value = window.location.href.split("/")[4];
        var type = 0;
        switch(value)
        {
            case "book":type=0;break;
            case "movie": type=3;break;
            case "flash": type=2;break;
        }
        console.log(type);
        return(
            <div>
            <Grid container id={"browser-item"}>
                <Grid item xs={9} style={{padding:20}}>
                    <Tags select={true} tagchange={this.handletagchange} tags={["热血","王道","搞怪","不高兴","没头脑"]}/>
                </Grid>
                <Grid item xs={3} style={{padding:20}}>
                    <AutoComplete
                        dataSource={this.state.dataSource}
                        onChange={value=>this.handleSearch(value)}
                        backfill={true}
                        placeholder={"11111\u00a0\u00a0\u00a0search"}
                    >
                        <Input.Search addonBefore={selectBefore} onSearch={value=>this.Search(value)} />
                    </AutoComplete>
                </Grid>
            </Grid>
            <Listitem currentpage={this.state.currentpage} type={type} search={this.state.search} handlepagechange={this.handlepagechange}/>
        </div>
        )
    }
}

export  default Itembrowsepage;
