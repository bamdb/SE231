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
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom';
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
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
        var status;
        switch (Number(nextProps.actType)) {
            case 1:
            case 2:
                status="您的好友"+nextProps.username+"正在浏览"+nextProps.itemname;
                break;
            case 3:
                status="您的好友"+nextProps.username+"看完了"+nextProps.itemname;
                break;
            case 4:
            case 5:
                status="您的好友"+nextProps.username+"搁置了"+nextProps.itemname;
                break;
            default:
                status="Status出错";
                break;
        }
        this.setState({
            status:status,
            userId:nextProps.userId,
            username:nextProps.username,
            date:nextProps.date,
            itemname:nextProps.itemname,
            itemid:nextProps.itemid
        })
    }
    render() {


        return(
            <div id={"activity"}>
            <List.Item
                key={"activity"}
                actions={[
                    <IconText type="star-o" text="156" />,
                    <IconText type="like-o" text="156" />,
                    <IconText type="message" text="2" />,
                ]}
                extra={
                    <img
                        width={200}
                        alt="暂无图片"
                        src={"http://202.120.40.8:30741/image/id/"+this.state.itemid+"1"}
                    />
                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={"http://202.120.40.8:30741/image/id/"+this.state.userId+"0"} className={useStyles.avatar} />}
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

