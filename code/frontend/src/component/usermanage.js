import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import '../index.css';
import {Table, Avatar, Popconfirm} from 'antd';


class Usermanage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isloaded: false,
            loading:true,

        }

        this.columns = [
            {
                title: 'ID',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
            },
            {
                title: '昵称',
                width: 100,
                dataIndex: 'username',
                key: 'username',
                fixed: 'left',
            },
            { title: '邮箱', dataIndex: 'mail', key: 'mail',
                render: (record) => {
                    const result = record==undefined ? "暂无" : record;
                    return <span>{result}</span>
                }},
            { title: '头像', dataIndex: 'imgUrl', key: 'imgUrl',
                render: (record) => {
                    const alt = record==undefined ? "暂无封面" : "封面显示错误";
                    if(record!=undefined) return <Avatar  src={record} alt={alt}/>;
                    else return <Avatar >{alt}</Avatar>
                }},
            {
                title: '操作',
                dataIndex: 'id',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text) => <span>
                     <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={this.deleteUser.bind(this,text)} >
                         <a title="用户删除">删除</a>
                     </Popconfirm>
                </span>
                ,
            },
        ];

        this.deleteUser = this.deleteUser.bind(this);
    }


    componentDidMount() {
        this.fetch();
    }

    deleteUser(userid) {
        axios.delete("https://api.bamdb.cn/auth/delete/id/"+userid)
            .then(function (res) {
                console.log(res);
            })
    }

    fetch(){
        axios.get("https://api.bamdb.cn/auth/all")
            .then(function (res) {
                this.setState({
                    users:res.data,
                    loading:false,
                })
            }.bind(this))
    }

    render(){
        return(
            <Table id={"usermanage"} columns={this.columns} dataSource={this.state.users} loading={this.state.loading} scroll={{ x: 800 }}  />
        )
    }
}

export default Usermanage;