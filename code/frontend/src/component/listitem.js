/*
 * score 未完成
 */

import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import Collectform from "./collectform";
import Alert from './alert';
import { List, Icon, Card, Pagination,Spin } from "antd";
import '../index.css'
import axios from 'axios';


/*
* 需要传入的props（包装成json后可以简化）
* props.name : 条目标题
* props.date : 条目出版/播出日期
* props.author : 条目作者
* props.score : 条目评分
* props.rank : 条目排名
* props.chapter : 条目章节数
*/


const IconText = ({ type, text, func}) => (
    <span onClick={func}>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

const { Meta } = Card;

class Listitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemList:[],
            modifiedItems:[],
            deleteItem:[],      // 删除条目
            content: "",        // 提示框内容
            collectItem:[],     // 收藏条目
            visible:false,      // 显示收藏提示框
            flush: false,        // 用于删除条目后跳转页面
            loading:true,
            totalPage:0,
        }
        this.handlepagechange=this.handlepagechange.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handlelike=this.handlelike.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleCancelAlert=this.handleCancelAlert.bind(this);
    }

    handleCancel(){
        this.setState({
            visible: false,
            collectItem:[]
        })
    }

    handlepagechange(e){
        this.props.handlepagechange(e);
    }
    componentDidMount() {
        var rows=[];
        var items=[];
        var currentpage=this.props.currentpage;

        axios.get(
            "https://api.bamdb.cn/rating/browser",{params:{
                    type:this.props.type,
                    page:currentpage-1,
                    pageSize:8
                }}
        )
            .then(function (response) {
                items=response.data;
                if(items !== undefined)
                {
                    var totalpage=items[0].totalPage;
                    for(var i=0; i<items.length; ++i) {
                        rows.push(
                            {
                                href: "/itemdetail/"+items[i].item.id,
                                id: items[i].item.id,
                                title:items[i].item.itemname,
                                author:items[i].item.mainAuthor,
                                pubTime: items[i].item.pubTime.split('T')[0],
                                score:items[i].rating.avgScore,
                                rank:items[i].rating.rank,
                                imgurl:items[i].item.imgurl,
                                chapterNum:items[i].item.chapterNum,
                            }
                        );
                    }
                    this.setState({
                        ItemList:items,
                        modifiedItems:rows,
                        loading:false,
                        totalPage:totalpage
                    })
                }
            }.bind(this))
    }

    componentWillReceiveProps(nextProps, nextContext) {
        var rows=[];
        var items=[];
        var currentpage=nextProps.currentpage;

        axios.get(
            "https://api.bamdb.cn/rating/browser",{params:{
                    type:nextProps.type,
                    page:currentpage-1,
                    pageSize:8
                }}
        )
            .then(function (response) {
                items=response.data;
                if(items !== undefined)
                {
                    var totalpage=items[0].totalPage;
                    for(var i=0; i<items.length; ++i) {
                        rows.push(
                            {
                                href: "/itemdetail/"+items[i].item.id,
                                id: items[i].item.id,
                                title:items[i].item.itemname,
                                author:items[i].item.mainAuthor,
                                pubTime: items[i].item.pubTime.split('T')[0],
                                score:items[i].rating.avgScore,
                                rank:items[i].rating.rank,
                                imgurl:items[i].item.imgurl,
                                chapterNum:items[i].item.chapterNum,
                            }
                        );
                    }
                    this.setState({
                    ItemList:items,
                    modifiedItems:rows,
                    loading:false,
                    totalPage:totalpage
                })
                }
            }.bind(this))
    }
    handleCancelAlert(content){
        this.setState({content : content, deleteItem:[]})
    }
    handleAlert(content,item) {
        this.setState({content : content, deleteItem:item})
    }
    handlelike(item){
        this.setState({visible:true,collectItem:item})
    }

    handleDelete(itemId) {
        axios.delete("https://api.bamdb.cn/item/delete/id/"+itemId).then(
            res => {
                this.setState({flush:true});
            }
        )
    }

    render() {
        if (this.state.flush==true) {
            return(<Redirect to={"/"}/>);
        }
        const items=this.state.modifiedItems;
        return(
            <div>
            <Collectform chapterNum={this.state.collectItem.chapterNum} itemid={this.state.collectItem.id} visible={this.state.visible} handleCancel={this.handleCancel} />
            <Alert content={this.state.content} cancelAlert={this.handleCancelAlert} confirmAlert={this.handleDelete.bind(this,this.state.deleteItem.id)}/>
            <List
                grid={{gutter:16,column: 4 }}
                itemLayout="horizontal"
                size="large"
                dataSource={items}
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
                                    src={item.imgurl.substring(0, 4) == "http"? item.imgurl : "http://"+item.imgurl}
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
                            <Meta
                                style={{margin:0}}
                                title={<Link to={item.href} target={'_blank'}>{item.title}</Link>}
                                description={
                                    <div>
                                        <p>评分：{item.score}</p>
                                        <p>排名：{item.rank}</p>
                                        <p>作者：{item.author}</p>
                                    </div>
                                }
                            />
                        </Card>
                    </List.Item>
                )}
            >
                {this.state.loading ? <Spin/> : <span/>}
            </List>
                <Pagination size="small"  total={this.state.totalPage*10} current={this.props.currentpage} onChange={current=>this.handlepagechange(current)}/>
            </div>
        );
    }
}

export default Listitem;
