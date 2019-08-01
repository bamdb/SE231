import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/index';
import axios from 'axios';
import Tags from "../component/tag";
import Listitem from '../component/listitem'
import {AutoComplete, Card, Icon, Input, List, Pagination, Select} from 'antd';
import {Link} from "react-router-dom";

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="0" style={{paddingLeft:8 }}>
        <Option value="0">全部</Option>
        <Option value="1">条目</Option>
        <Option value="2">用户</Option>
    </Select>
);

const IconText = ({ type, text, func}) => (
    <span onClick={func}>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Searchpage extends Component {
    constructor(props){
        super(props)
        this.state={
            search:"",
            dataSource:[],
            dataSourceId:[],
            items:[],
            currentpage:1,
        }
        this.handleitem = this.handleitem.bind(this);
        this.handlepagechange = this.handlepagechange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value){
        this.setState({search: value})
    }

    handlepagechange(page){
        this.setState({currentpage:page})
        var id=[];
        axios.get('http://202.120.40.8:30741/search/ik/item',{params:{keystring:this.state.search,page:page-1,size:8}})
            .then(function (res) {
                if (res.data.content !== undefined) {
                    res.data.content.forEach(item => {
                        id.push(item.id);
                    })
                }
                this.setState({
                    dataSourceId:id,
                });
                this.handleitem(id);
            }.bind(this))
    }

    componentWillMount() {
        const search = window.location.href.split('#')[1].split('/')[2];
        this.setState({
            search:search,
        })
        var dataSource=[];
        var id=[];
        console.log("start search");
        axios.get('http://202.120.40.8:30741/search/ik/item',{params:{keystring:search,page:0,size:8}})
            .then(function (res) {
                if(res.data.content!==undefined){
                    res.data.content.forEach(item=>{
                        dataSource.push(item.itemname);
                        id.push(item.id);
                    })
                }
                this.setState({
                    dataSource:dataSource,
                    dataSourceId:id,
                })
                console.log("finish search")
                this.handleitem(id);
            }.bind(this))
    }

    handleitem(id) {
        var items=[];
        console.log(id);
        if(id.length !== undefined && id.length !== 0)
        id.forEach(id => {
            axios.get('http://202.120.40.8:30741/rating/itemid/'+id)
                .then(function (res) {
                    if(res.data!==null){
                        const item=res.data;
                        items.push(
                            {
                                href: "/itemdetail/"+item.item.id,
                                id: item.item.id,
                                title:item.item.itemname,
                                author:item.item.mainAuthor,
                                pubTime: item.item.pubTime.split('T')[0],
                                score:item.rating.avgScore,
                                rank:item.rating.rank,
                                imgurl:item.item.imgurl,
                                chapterNum:item.item.chapterNum,
                            }
                        );
                        this.setState({items:items})
                    }
                }.bind(this))
        })
    }

    render(){
        return(
            <Grid container justify={"center"}>
                <Grid item xs={4}>
                    <AutoComplete
                        dataSource={this.state.dataSource}
                        defaultValue={this.state.search}
                        size={"large"}
                    >
                        <Input.Search addonBefore={selectBefore} onSearch={value=>this.handleSearch.bind(this,value)}/>
                    </AutoComplete>
                </Grid>
                <Grid item xs={9}>
                    <List
                        grid={{gutter:16,column: 4 }}
                        itemLayout="horizontal"
                        size="large"
                        dataSource={this.state.items}
                        renderItem={item => (
                            <List.Item
                                key={item.title}

                            >
                                <Card
                                    size={"small"}
                                    style={{maxWidth:200}}
                                    cover={
                                        <img
                                            height={120}
                                            alt="defaultbook"
                                            src={"http://"+item.imgurl}
                                        />
                                    }
                                    actions={        // show delete icon in editor page
                                        localStorage.getItem("role") == "ROLE_EDITOR" ? (
                                            [
                                                <IconText type="star" func={this.handlelike.bind(this,item)} />,
                                                <IconText type="delete" text="2" func={this.handleAlert.bind(this, "确认删除该条目？",item)}/>
                                            ]
                                        ) : (
                                            [
                                                <IconText type="star"func={this.handlelike.bind(this,item)} />
                                            ]
                                        )}
                                >
                                    <Card.Meta
                                        style={{margin:0}}
                                        title={<Link to={item.href} target={'_blank'}>{item.title}</Link>}
                                        description={"评分："+item.score+'\n'+"排名：" +item.rank +'\n'}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Grid container alignContent={"center"} justify={"center"}>
                    <Pagination size="small"  total={100} current={this.props.currentpage} onChange={current=>this.handlepagechange(current)}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Searchpage;