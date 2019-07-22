/*
 * score 未完成
 */

import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Modal} from "antd";
import Collectform from "./collectform";
import '../css/listitem.css'
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from './alert';
import { List, Avatar, Icon, Card } from "antd";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        minWidth: 800,
        width: '100%',
    },
    paper: {
        padding: theme.spacing(3, 2),
        width: 200
    },
    image: {
        height: 120,
        width: 96,
    },
    card: {
        maxWidth: 345,
        height:100
    },
}));

/*
* 需要传入的props（包装成json后可以简化）
* props.name : 条目标题
* props.date : 条目出版/播出日期
* props.author : 条目作者
* props.score : 条目评分
* props.rank : 条目排名
* props.chapter : 条目章节数 
*/


const IconText = ({ type, text }) => (
    <span>
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
            content: "",        // 提示框内容
            flush: false        // 用于删除条目后跳转页面
        }
        this.handlepagechange=this.handlepagechange.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    componentWillMount() {

        /*var rows=[];
        const items = this.props.ItemList;
        if(items !== undefined)
        {
            for(var i=0; i<items.length; ++i) {
                if (items[i].item.itemname.indexOf(this.props.search) !== -1) {
                    rows.push(
                        {
                            href: "/itemdetail/"+items[i].item.id,
                            title:items[i].item.itemname,
                            author:items[i].item.mainAuthor,
                            pubTime: items[i].item.pubTime.split('T')[0],
                            score:items[i].rating.avgScore,
                            rank:items[i].rating.rank
                        }
                    );
                }
            }
            console.log(rows);
        }
        else console.log("no data");
        rows.push(
            {
                href: "/itemdetail/1",
                title:"three body",
                author:"liu",
                pubTime: "2010-7-1",
                score:9.5,
                rank:1
            }
        );
        this.setState({
            ItemList:items,
            modifiedItems:rows,
        })*/
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
                            imgurl:items[i].item.imgurl
                        }
                    );
                }
            }
            console.log(rows);
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
/*
    {
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
    }

 */

    handleAlert(content) {
        this.setState({content : content})
    }

    handleDelete(itemId) {
        axios.delete("http://202.120.40.8:30741/item/delete/id/"+itemId+"?access_token="+localStorage.getItem("access_token")).then(
            res => {
                this.handleAlert(res.data);
                this.setState({flush:true});
            }
        )
    }

    render() {
        if (this.state.flush==true) {
            return(<Redirect to={"/"}/>);
        }
        const items=this.state.modifiedItems;
        return(<List
                grid={{gutter:16,column: 4 }}
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
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
                            style={{minWidth:144}}
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
                                    <IconText type="star-o" text="156" />,
                                    <IconText type="like-o" text="156" />,
                                    <IconText type="message" text="2" />,
                                    <div>
                                        <Alert content={this.state.content} cancelAlert={this.handleAlert} confirmAlert={this.handleDelete.bind(this,item.id)}/>
                                        <DeleteIcon onClick={this.handleAlert.bind(this, "确认删除该条目？")}/>
                                    </div>
                                ]
                                ) : (
                                    [
                                        <IconText type="star-o" text="156" />,
                                        <IconText type="like-o" text="156" />,
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
        );
    }
}

export default Listitem;