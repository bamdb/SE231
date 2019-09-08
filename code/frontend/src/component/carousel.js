import React, { Component } from 'react';
import '../index.css'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import {Card, Carousel, List} from 'antd';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";

class CarouselItem extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[],
            imgs:[]
        }
    }
    async componentDidMount() {

        const data = await axios.get("https://api.bamdb.cn/activity/userid/"+localStorage.getItem("userid"));
        const activities = data.data;
        var ids = [];
        if(activities!=undefined)
            activities.forEach(activity =>{
                ids.push(activity.item.id)
            })
        console.log(ids);
        var items = await axios.post("https://api.bamdb.cn/recommend",{itemids:ids},{headers:{"Content-Type":"application/json"}})
        items = items.data;

        /*
       var items=[60797,120749,
           136034,
           56989,
           102045,
           113698];*/
        var imgs = [];
        for (var i=0; i<items.length && i<4; i++)
        {
            await axios.get("https://api.bamdb.cn/item/id/"+items[i])
                .then(function (res) {
                    if(res.status == 200)
                    {
                        console.log(res.data)
                        imgs.push(res.data)
                        this.setState({imgs:imgs})
                    }
                }.bind(this))
        }
    }


    /*
    const data= {
            itemids: [1,2,3,4,5]
        }

     */
    render(){


        return(
            <div>
                <br/>
                <Typography variant={"subtitle1"} color={"textSecondary"} >个性推荐</Typography>
                <Divider />
                <br/>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10} >
                            <List
                                grid={{gutter:16,column: 4 }}
                                itemLayout="horizontal"
                                size="large"
                                dataSource={this.state.imgs}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                    >
                                        <Card
                                            size={"small"}
                                            style={{maxWidth:200}}
                                            cover={
                                                <img
                                                    height={120}
                                                    alt="defaultbook"
                                                    src={"http://" + item.imgurl}/>
                                            }
                                        >
                                            <Card.Meta
                                                style={{margin:0}}
                                                title={<Link to={'/itemdetail/'+item.id} target={'_blank'}>{item.itemname}</Link>}
                                                description={
                                                    <div>
                                                        <p>作者：{item.mainAuthor}</p>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                                />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CarouselItem;