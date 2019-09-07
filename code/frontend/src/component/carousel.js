import React, { Component } from 'react';
import '../index.css'
import axios from 'axios';

import { Carousel } from 'antd';

class CarouselItem extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[60797,
                198894,
                234305,
                15047,
                153195,
                182239],
            imgs:[]
        }
    }
    async componentDidMount() {
        const {items} = this.state;
        var imgs = [];
        for (var i=0; i<items.length; i++)
        {
            await axios.get("https://api.bamdb.cn/item/id/"+items[i])
                .then(function (res) {
                    if(res.status == 200)
                    {
                        console.log(res.data.imgurl)
                        imgs.push({
                            url:res.data.imgurl,
                            name: res.data.itemname
                        })
                        this.setState({imgs:imgs})
                    }
                }.bind(this))
        }
    }


    /*
    const data= {
            itemids: [1,2,3,4,5]
        }
        axios.post("https://api.bamdb.cn/recommend",data,{headers:{"Content-Type":"application/json"}})
            .then(function (res) {
                if(res.status == 200)
                {
                    const ids = res.data;
                    this.setState({
                        items:ids
                    })
                }
            }.bind(this))
     */
    render(){

        var rows = [];
        for(var i=0; i<this.state.imgs.length; i++) {
            if(this.state.imgs[i].url!==undefined)
            rows.push(
                <div key={i} id={"carousel"}>
                    {this.state.imgs[i].name}
                    <img src={"http://"+this.state.imgs[i].url}/>

                </div>
            )
        }

        return(
            <Carousel autoplay>
                {rows}
            </Carousel>
        )
    }
}

export default CarouselItem;