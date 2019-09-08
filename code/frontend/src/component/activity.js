/*
 * 用户动态
 * 渲染某一用户对单个item的收藏状态
 * eg. id为1的用户想看评分为7.12766的《三体》
 *
 * 图片调取渲染 未完成
 *
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {List, Avatar, Icon, Divider} from 'antd';

const useStyles = makeStyles({
    root: {
        minWidth : 300,
    },

    avatar: {
        marginTop : 20,
        margin: 10,
    },
    card: {
        borderRadius: 10,
        borderSize: 3,
        maxWidth: 50
    }
});


/*
* 需要传入的props（包装成json后可以简化）
* props.username : 用户名
* props.userId : 用户id
* props.date : 用户收藏时间
* props.actType : 对条目的新收藏状态（int类型）
* props.itemId : 条目id
*
*/

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);


class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statues:"",
            userId:"",
            username:"",
            date:"",
            itemname:"",
            itemid:"",
            imgurl:""
        }
    }

    componentWillMount() {
        console.log("username:",this.props.username)
        var status;
        switch (Number(this.props.actType)) {
            case 0:
            case 1:
            case 2:
                status="您的好友"+this.props.username+"正在浏览"+this.props.itemname;
                break;
            case 3:
                status="您的好友"+this.props.username+"看完了"+this.props.itemname;
                break;
            case 4:
            case 5:
                status="您的好友"+this.props.username+"搁置了"+this.props.itemname;
                break;
            default:
                status="Status出错";
                break;
        }
        this.setState({
            status:status,
            userId:this.props.userId,
            username:this.props.username,
            date:this.props.date.split('T')[0],
            itemname:this.props.itemname,
            itemid:this.props.itemid
        })
        axios.get("https://api.bamdb.cn/item/id/"+this.props.itemid).then(function (res) {
            this.setState({imgurl:res.data.imgurl})
        }.bind(this))
    }
    render() {

        return(
            <div id={"activity"}>
            <List.Item
                key={"activity"}
                extra={
                    <img
                        width={200}
                        alt="暂无图片"
                        src={"http://"+this.state.imgurl}
                        height={120}
                    />
                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={"https://api.bamdb.cn/image/id/"+this.state.userId+"0"} className={useStyles.avatar} />}
                    title={this.state.username+"   "+this.state.date}
                    description={this.state.status}
                />
            </List.Item>
            <Divider id={"activity-divider"} />
            </div>
        );
    }

}

export default Activity;

