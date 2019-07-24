import React, { Component } from 'react';
import axios from 'axios';

import { Carousel } from 'antd';

class CarouselItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Carousel autoplay>
                <div>
                    <img src={require("../page/book1.jpg")} />
                </div>
                <div>
                    <img src={require("../img/book2.jpg")} />
                </div>
                <div>
                    <img src={require("../img/movie1.jpg")} />
                </div>
                <div>
                    <img src={require("../img/movie2.jpg")} />
                </div>
            </Carousel>
        )
    }
}

export default CarouselItem;