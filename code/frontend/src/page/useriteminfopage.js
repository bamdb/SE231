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

class Useriteminfopage extends Component {
    constructor(props)
    {
        super(props);
        this.state={data:{}};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handlebuttonclick=this.handlebuttonclick.bind(this);
    }
    handlebuttonclick(currentpage)
    {

    }
    handleSearch(value){}
    handletagchange(tags){
        this.setState({tags:tags});
    }
    componentWillMount() {
        var uri=window.location.href;
        var id=uri.split('#')[1].split('/')[2];

        var url="http://202.120.40.8:30741/item/id/"+id;
        var url="http://202.120.40.8:30741/item/id/"+id;
        axios.get(url).then(
            function (response){
                console.log(response.data);
                this.setState({data:response.data});
            }.bind(this)
        ).catch(function (error) {
            alert("error")
        });
        axios.get()

    }

    render(){
        var itemdata=this.state.data;
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
                            <Rating handlebuttonclick={this.handlebuttonclick}></Rating>
                        </Grid>
                        <Grid  item xs={3} >
                            <Collect/>
                            <Relateditem />
                            <Commentlist />
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Useriteminfopage;