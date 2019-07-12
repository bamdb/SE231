/*
 * 显示用户单个条目的阅读进度与书评
 */

import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid'

import Navigation from '../component/navigation';
import Item from '../component/item';
import Progressmanage from "../component/progressmanage";
import Commentlist from "../component/commentlist";
import Relateditem from "../component/relatedlist";

import Scheduletable from "../component/scheduletable";
import Tag from "../component/tag"
import axios from 'axios'
import Rating from "../component/rating";
import Collect from "../component/collect";
import $ from 'jquery'
class Useriteminfopage extends Component {
    constructor(props)
    {
        super(props);
        this.state={data:{},rating:{},totgrade:[]};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlebuttonclick=this.handlebuttonclick.bind(this);
    }
    handlebuttonclick(currentpage)
    {
        var uri=window.location.href;;
        var id=uri.split('#')[1].split('/')[2];
        var text=this.state.totgrade;
        var url2="http://202.120.40.8:30741/rating/update/itemid/"+id;
        $.ajax({
            url:url2,
            type:"PUT",
            contentType:"application/json",
            data:text,
            success: function f(data) {
                console.log(data);
            }.bind(this)
        })
    }
    handleSearch(value){}
    handletagchange(tags){
        this.setState({tags:tags});
    }
    componentWillMount() {
        var uri=window.location.href;
        var id=uri.split('#')[1].split('/')[2];

        var url="http://202.120.40.8:30741/item/id/"+id;
        var url1="http://202.120.40.8:30741/rating/itemid/"+id;
        axios.get(url).then(
            function (response){
                console.log(response.data);
                this.setState({data:response.data});
            }.bind(this)
        ).catch(function (error) {
            alert("error")
        });
        axios.get(url1).then(
            function(response){
                var totgrade=[];
                totgrade.push(response.data.rating.score1,response.data.rating.score2,response.data.rating.score3,response.data.rating.score4,response.data.rating.score5,response.data.rating.score6,response.data.rating.score7,response.data.rating.score8,response.data.rating.score9,response.data.rating.score10)

                this.setState({rating:response.data.rating,totgrade:totgrade})
            }.bind(this)
        )

    }

    render(){
        var itemdata=this.state.data;
        var totgrade=[];
        totgrade.push(this.state.rating.score1,this.state.rating.score2,this.state.rating.score3,this.state.rating.score4,this.state.rating.score5,this.state.rating.score6,this.state.rating.score7,this.state.rating.score8,this.state.rating.score9,this.state.rating.score10)
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}><Navigation/></Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}/>
                        <Grid item xs={1} >
                            <Item isbn={itemdata.id} date={itemdata.pubTime} name={itemdata.itemname} pages={itemdata.chapterNum} author={itemdata.mainAuthor}/>
                        </Grid>
                        <Grid  item xs={6} >
                            <Scheduletable />
                            <Tag select={true} tagchange={this.handletagchange}></Tag>
                            <br/>
                            <Rating handlebuttonclick={this.handlebuttonclick}></Rating>
                            <Commentlist />
                        </Grid>
                        <Grid  item xs={3} >
                            <Collect totGrade={this.state.totgrade} avgGrade={this.state.rating.avgScore} rank={this.state.rating.rank}/>
                            <Relateditem />

                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Useriteminfopage;