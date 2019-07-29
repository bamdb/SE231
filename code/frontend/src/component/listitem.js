/*
 * score 未完成
 */

import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Collectform from "./collectform";
import Alert from './alert';
import { List, Avatar, Icon, Card } from "antd";
import '../css/listitem.css'
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
            flush: false        // 用于删除条目后跳转页面
        }
        this.handlepagechange=this.handlepagechange.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleCollect=this.handleCollect.bind(this);
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

    handleCollect(type,item){
        var chapters=[];
        switch (type) {
            case 0: case 1:
                for(var i=0;i<item.chapterNum;i++)
                    chapters.push({
                        chapterNum: i,
                        finish:0,
                        sections:[],
                    });
                break;
            case 3:
                for(var i=0;i<item.chapterNum;i++)
                    chapters.push({
                        chapterNum: i,
                        finish:1,
                        sections:[],
                    });
                break;
            default:
                break;
        }

        if(type<=3)
        axios.put("http://202.120.40.8:30741/activity/update/progress",
            {userId:localStorage.getItem("userid"),itemId:item.id,chapters:chapters},
            {params:localStorage.getItem("access_token")}
        );
    }
    handlepagechange(page){
        this.props.handlepagechange(page);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var rows=[];
        const items = nextProps.ItemList;
        if(items !== undefined)
        {
            for(var i=0; i<items.length; ++i) {
                if (items[i].item.itemname.indexOf(this.props.search) !== -1) {
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
            }
        }
        else {
            console.log("no data");
            rows.push(
                {
                    href: "/itemdetail/1",
                    title: "three body",
                    author: "liu",
                    pubTime: "2010-7-1",
                    score: 9.5,
                    rank: 1
                }
            );
        }
        this.setState({
            ItemList:items,
            modifiedItems:rows,
        })
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
        axios.delete("http://202.120.40.8:30741/item/delete/id/"+itemId).then(
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
            <Collectform itemid={this.state.collectItem.id} visible={this.state.visible} handleCancel={this.handleCancel} handleprogress={(type)=>this.handleCollect(type,this.state.collectItem)}/>
            <Alert content={this.state.content} cancelAlert={this.handleCancelAlert} confirmAlert={this.handleDelete.bind(this,this.state.deleteItem.id)}/>
            <List
                grid={{gutter:16,column: 4 }}
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: page => {
                        this.handlepagechange(page);
                    },
                    pageSize: 8
                }}
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
                                    src={item.imgurl}
                                />
                            }
                            actions={        // show delete icon in editor page
                                localStorage.getItem("role") == "ROLE_EDITOR" ? (
                                [
                                    <IconText type="star" func={this.handlelike.bind(this,item)} />,
                                    <IconText type="like-o" text="156"/>,
                                    <IconText type="delete" text="2" func={this.handleAlert.bind(this, "确认删除该条目？",item)}/>
                                ]
                                ) : (
                                    [
                                        <IconText type="star"func={this.handlelike.bind(this,item)} />,
                                        <IconText type="like-o" text="156"/>,
                                        <IconText type="message" text="2" />
                                    ]
                                )}
                        >
                            <Meta
                                style={{margin:0}}
                                title={<Link to={item.href}>{item.title}</Link>}
                                description={"评分："+item.score+'\n'+"排名：" +item.rank +'\n'
                                            +"This is description."}
                            />
                        </Card>
                    </List.Item>
                )}
            />
            </div>
        );
    }
}

export default Listitem;