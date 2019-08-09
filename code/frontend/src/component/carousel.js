import React, { Component } from 'react';
import '../index.css'
import axios from 'axios';

import { Carousel } from 'antd';

class CarouselItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Carousel autoplay>
                <div id={"carousel"}>
                    <img src={require("../img/book1.jpg")} />
                </div>
                <div id={"carousel"}>
                    <img src={require("../img/book2.jpg")} />
                </div>
                <div id={"carousel"}>
                    <img src={require("../img/movie1.jpg")} />
                </div>
                <div id={"carousel"}>
                    <img src={require("../img/movie2.jpg")} />
                </div>
            </Carousel>
        )
    }
}

export default CarouselItem;