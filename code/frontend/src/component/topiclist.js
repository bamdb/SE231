import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import { Table} from 'antd';
import '../css/item.css'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Topic from "./topic";

/*
* 需要传入的props(需要以List形式传入，通过ForEach以topic渲染)
* props.topicId : 话题id
* props.content : 话题内容
* props.author : 话题发布者
* props.replyTotal : 话题回复总数
* props.date : 发布时间
*/

class TopicList extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics:[],
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({topics:nextProps.topics})
    }

    render(){
        var topics=this.state.topics;
        var item=[
            {
                title: '主题',
                width:150,
                dataIndex: 'title',
                render:(text, record) => (
                    <Link to={'/topicdetail/'+record.id}>{text}</Link>
                )
            },
            {
                title: '发表用户',
                dataIndex: 'userId',
                width: 100,
            },
            {
                title:'回复数',
                dataIndex:'replyTotal',
                width:100,
                render: text => {
                    if(text===undefined) return("233");
                    else return text;
                }
            },
            {
                title: '发表时间',
                dataIndex: 'pubTime',
                width:150,
                render: text => (
                    text.split('T')[0]
                )

            },
        ];
        if(topics!==undefined)
        {
            return (
                <Grid item xs={12}>
                <Table columns={item} dataSource={topics} />
                </Grid>
            )
        }



        return(
            <Grid container spacing={0} direction={"column"}>
            </Grid>
        )
    }
}

export default TopicList;