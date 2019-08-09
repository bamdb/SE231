import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import '../css/scheduletable.css'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyle = makeStyles({
    img:{
        width:100,
    },
    card: {
        maxWidth: 345,
        height:100
    },
})

class Scheduletableold extends Component {
    constructor(props) {
        super(props);
        this.state={
            readstat:[0,[0,1,0],0,1,1,0],
            show:false,
            completed:35,
            current:0,
            current1:-1,
            x1:0,
            x2:0,
            show1:false,
            itemname: ""};
        this.handleClose = this.handleClose.bind(this);
        this.showEditBar = this.showEditBar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleclick=this.handleclick.bind(this);
        this.handleclickhas=this.handleclickhas.bind(this);
        this.handleclickhasnot=this.handleclickhasnot.bind(this);
        this.handleclick1=this.handleclick1.bind(this);
        this.handleclickhas1=this.handleclickhas1.bind(this);
        this.handleclickhasnot1=this.handleclickhasnot1.bind(this);
    }

    showEditBar(){
        this.setState({
            show:true,
        })
    }

    handleClose(){
        this.setState({
            show:false,
        })
    }

    handleChange(e) {
    }

    handleclickhas1() {
        var readstat=this.state.readstat;
        readstat[this.state.current][this.state.current1]=1;
        this.setState({readstat:readstat,show1:false,current1:-1})
    }

    handleclickhasnot1() {
        var readstat=this.state.readstat;
        readstat[this.state.current][this.state.current1]=0;
        this.setState({readstat:readstat,show1:false,current1:-1})
    }

    handleclick1(e) {
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

    handleclickhasnot() {
        var readstat=this.state.readstat;
        readstat[this.state.current]=0;
        this.setState({readstat:readstat,show:false,show1:false})
    }

    componentDidMount() {
        if(this.props.readstat!=null)
        {
            this.setState({readstat:this.props.readstat,itemname:this.props.itemname})
        }
    }

    render() {
        var readstat=this.state.readstat;
        var item=[];
        console.log(this.state.readstat)
        for(var i=0;i<readstat.length;++i) {

            if(readstat[i]==0) {
                item.push(
                    <button class="type1" id={i} onClick={this.handleclick}>{i}</button>
                );
            }
            else{
                item.push(
                    <button class="type2" id={i} onClick={this.handleclick}>{i}</button>
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
export default Scheduletableold;