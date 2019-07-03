import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import '../css/scheduletable.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";


class Scheduletable extends Component {
    constructor(props) {
        super(props);
        this.state={hasread:[1,3,5],total:10,x:0,y:0,show:false,current:0};
        this.handleclick=this.handleclick.bind(this);
        this.handleclickhas=this.handleclickhas.bind(this);
        this.handleclickhasnot=this.handleclickhasnot.bind(this);
    }
    handleclick(e) {

        var hasread=this.state.hasread;
        this.setState({x:e.clientX,y:e.clientY,show:true,current:e.target.id})

    }
    handleclickhas()
    {
        var hasread=this.state.hasread;
        for(var i=0;i<hasread.length;++i) {
            if(hasread[i]===parseInt(this.state.current)) {
                this.setState({read:hasread,show:false});
                return;
            }
        }
        hasread.push(parseInt(parseInt(this.state.current)));
        this.setState({read:hasread,show:false});
        console.log(hasread)
    }
    handleclickhasnot()
    {
        var hasread=this.state.hasread;
        for(var i=0;i<hasread.length;++i) {
            if(hasread[i]===parseInt(this.state.current)) {
                hasread.splice(i,1);
                this.setState({read:hasread,show:false});
                return;
            }
        }

        this.setState({read:hasread,show:false});
        console.log(hasread)
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    render() {
        var hasread=this.state.hasread;
        var item=[];
        var count=0;
        for(var i=1;i<this.state.total;++i) {
            var tag=false;
            for(var j=0;j<hasread.length;++j) {
                if(hasread[j]==i){
                    tag=true
                }
            }
            if(!tag) {

                item.push(
                    <button  id={i} class="type1" onClick={this.handleclick}>{i}</button>
                );
                ++count;
            }
            else{
                item.push(
                    <button  id={i} class="type2" onClick={this.handleclick}>{i}</button>
                );
            }

        }
        if(!this.state.show){
            return(
                <div >
                    <Paper id={"tagmain"}>
                        {item}
                    </Paper>
                </div>
            )
        }

        else{
            var style={"position":"absolute"};
            style["top"]=this.state.y;
            style["left"]=this.state.x;
            return(
                <div >
                    <Paper id={"tagmain"}>
                        {item}
                        <div style={style}>
                            <Paper id={"detail"}>
                                <Typography paragraph>
                                    small introduction
                                </Typography>
                                <Button onClick={this.handleclickhas}>
                                    看过
                                </Button>
                                <Button onClick={this.handleclickhasnot}>
                                    没看过
                                </Button>
                            </Paper>
                        </div>
                    </Paper>
                </div>
            )
        }

    }
}
export default Scheduletable;