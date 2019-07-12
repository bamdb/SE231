import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import '../css/scheduletable.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


class Scheduletable extends Component {
    constructor(props) {
        super(props);
        this.state={readstat:[0,[1,0,1,0],0,1,1,0],x:0,y:0,show:false,current:0,current1:-1,x1:0,x2:0,show1:false};
        this.handleclick=this.handleclick.bind(this);
        this.handleclickhas=this.handleclickhas.bind(this);
        this.handleclickhasnot=this.handleclickhasnot.bind(this);
        this.handleclick1=this.handleclick1.bind(this);
        this.handleclickhas1=this.handleclickhas1.bind(this);
        this.handleclickhasnot1=this.handleclickhasnot1.bind(this);
    }
    handleclickhas1()
    {
        var readstat=this.state.readstat;
        readstat[this.state.current][this.state.current1]=1;
        this.setState({readstat:readstat,show1:false,current1:-1})
    }
    handleclickhasnot1()
    {
        var readstat=this.state.readstat;
        readstat[this.state.current][this.state.current1]=0;
        this.setState({readstat:readstat,show1:false,current1:-1})
    }
    handleclick1(e)
    {
        this.setState({x1:e.clientX,y1:e.clientY,show:true,current1:e.target.id,show1:true})
    }
    handleclick(e) {


        this.setState({x:e.clientX,y:e.clientY,show:true,current:e.target.id})

    }
    handleclickhas()
    {
        var readstat=this.state.readstat;
        readstat[this.state.current]=1;
        this.setState({readstat:readstat,show:false,show1:false})
    }
    handleclickhasnot()
    {
        var readstat=this.state.readstat;
        readstat[this.state.current]=0;
        this.setState({readstat:readstat,show:false,show1:false})
    }
    componentWillMount() {

    }
    componentDidMount() {
        if(this.props.readstat!=null)
        {
            this.setState({readstat:this.props.readstat,total:this.props.total})
        }
    }

    render() {
        var readstat=this.state.readstat;
        var item=[];

        for(var i=0;i<readstat.length;++i) {

            if(readstat[i]==0) {

                item.push(
                    <button  id={i} class="type1" onClick={this.handleclick}>{i}</button>
                );

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

        else if(!readstat[this.state.current].length>0){
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
        else
        {
            var style={"position":"absolute"};
            style["top"]=this.state.y;
            style["left"]=this.state.x;
            var items1=[];
            for(var i=0;i<readstat[this.state.current].length;++i)
            {
                if(readstat[this.state.current][i]==0) {

                    items1.push(
                        <button  id={i} class="type1" onClick={this.handleclick1}>{i}</button>
                    );

                }
                else{
                    items1.push(
                        <button  id={i} class="type2" onClick={this.handleclick1}>{i}</button>
                    );
                }
            }
            if(!this.state.show1 ) {
                return(
                    <div >
                        <Paper id={"tagmain"}>
                            {item}
                            <div style={style}>
                                <Paper id={"detail"}>
                                    <Grid>
                                        {items1}
                                    </Grid>
                                </Paper>
                            </div>
                        </Paper>
                    </div>
                )
            }
            else{
                var style1={"position":"absolute"};
                style1["top"]=this.state.y1;
                style1["left"]=this.state.x1;
                return(
                    <div >
                        <Paper id={"tagmain"}>
                            {item}
                            <div style={style}>
                                <Paper id={"detail"}>
                                    <Grid>
                                        {items1}
                                    </Grid>
                                </Paper>

                            </div>
                        </Paper>
                        <div style={style1}>
                            <Paper id={"detail"}>
                                <Typography paragraph>
                                    small introduction
                                </Typography>
                                <Button onClick={this.handleclickhas1}>
                                    看过
                                </Button>
                                <Button onClick={this.handleclickhasnot1}>
                                    没看过
                                </Button>
                            </Paper>
                        </div>
                    </div>
                )
            }

        }

    }
}
export default Scheduletable;