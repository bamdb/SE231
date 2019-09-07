/*
 * 显示用户单个条目的阅读进度与书评
 */

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'
import Item from '../component/item';
import Commentlist from "../component/commentlist";
import Relateditem from "../component/relatedlist";
import {Divider, Card, Icon} from 'antd';
import Tags from "../component/tag"
import axios from 'axios'
import Collect from "../component/collect";
import Scheduletableold from "../component/scheduletableold";
import Collectform from "../component/collectform";
import Alert from "../component/alert";
import {switchCase} from "@babel/types";
class Useriteminfopage extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            data:{},rating:{},totgrade:[],comments:[],id:1,userid:1,readstat:[],
            visible:false,
            status:"",
            content:"",
        };
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleCollect=this.handleCollect.bind(this);
    }
    /*handlebuttonclick()
    {
        var uri=window.location.href;;
        var id=uri.split('#')[1].split('/')[2];
        var text=this.state.totgrade;
        var url2="https://api.bamdb.cn/rating/update/itemid/"+id;
        $.ajax({
            url:url2,
            type:"PUT",
            contentType:"application/json",
            data:text,
            success: function f(data) {
                console.log(data);
            }.bind(this)
        })
    }*/

    handleCancel(){
        this.setState({visible:false,content:""})
    }

    handleCollect(){
        if(localStorage.getItem("userid"))
            this.setState({visible:true})
        else this.setState({content:"请先登录"})
    }
    handleSearch(value){}
    handletagchange(tags){
        this.setState({tags:tags});
    }
    componentWillMount() {
        if(localStorage.getItem("userid") == null)
            window.location.href="/login";

        var uri=window.location.href;
        var id=uri.split('/')[4];
        this.setState({userid:localStorage.getItem("userid"),id:id})

        var url="https://api.bamdb.cn/item/id/"+id;
        var url1="https://api.bamdb.cn/rating/itemid/"+id;
        var url2="https://api.bamdb.cn/activity/itemid/"+id;
        var url3="https://api.bamdb.cn/comment/itemid/"+id;

        axios.get(url).then(
            function (response){
                this.setState({data:response.data,chapterNum:response.data.chapterNum});
            }.bind(this)
        ).catch(function (error) {
            alert("error")
        });

        axios.get(url1).then(
            function(response){
                var totgrade=[];
                totgrade.push(response.data.score1,response.data.score2,response.data.score3,response.data.score4,response.data.score5,response.data.score6,response.data.score7,response.data.score8,response.data.score9,response.data.score10)

                this.setState({rating:response.data,totgrade:totgrade})
            }.bind(this)
        )

        axios.get(url3).then(
            function(response){
                console.log(response.data);
                var status="未收藏";
                if(response.data.length != 0)
                    response.data.forEach(comment =>{
                        if(comment.user.id == localStorage.getItem("userid"))
                            status = "收藏了";
                    })
                this.setState({comments:response.data,status: status});
            }.bind(this)
        )
        /*axios.get(url4,{params:{itemId:id,userId:1}}).then(
            function(response){
                this.setState({readstat:response.datat.chapters})
            }.bind(this)
        )
        axios.get(url5).then(
            function(response)
            {
                this.setState({tags:response.data.tags})
            }.bind(this)
        )*/
    }

    render(){
        var itemdata=this.state.data;
        var totgrade=[];
        totgrade.push(this.state.rating.score1,this.state.rating.score2,this.state.rating.score3,this.state.rating.score4,this.state.rating.score5,this.state.rating.score6,this.state.rating.score7,this.state.rating.score8,this.state.rating.score9,this.state.rating.score10)
        return(
                    <Grid container spacing={2}>
                        <Alert content={this.state.content} cancelAlert={this.handleCancel} confirmAlert={this.handleCancel}/>
                        <Collectform chapterNum={this.state.chapterNum} itemid={this.state.id} visible={this.state.visible} handleCancel={this.handleCancel} />
                        <Grid item xs={2} >
                            <Item imgurl={itemdata.imgurl} date={itemdata.pubTime} name={itemdata.itemname} pages={itemdata.chapterNum} author={itemdata.mainAuthor}/>
                            <Grid container justify={"center"} alignContent={"center"}>
                            <Icon type={"star"} style={{fontSize:20}} onClick={this.handleCollect}/>
                            </Grid>
                        </Grid>
                        <Divider type={"vertical"} style={{height:400}}/>
                        <Grid  item xs={6} >
                            <Commentlist comments={this.state.comments}/>
                        </Grid>
                        <Grid  item xs={3} >
                            <Collect status={this.state.status} totGrade={this.state.totgrade} avgGrade={this.state.rating.avgScore} rank={this.state.rating.rank} itemid={this.state.id} userid={this.state.userid}/>
                            <Relateditem prior={itemdata.relationPrior} subsequent={itemdata.relationSubsequent} normal={itemdata.relationNormal} itemid={itemdata.id}/>
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
        );
    }
}

export default Useriteminfopage;

/*
<Tags select={false} tagchange={this.handletagchange} tags={this.state.tags}/>
 */
