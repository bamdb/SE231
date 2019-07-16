import React, { Component } from 'react';
 
import Paper from '@material-ui/core/Paper';

import '../css/progressmanage.css';
import Scheduletable from './scheduletable'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Progressmanage extends Component {
    constructor(props) {
        super(props);
        this.state={label:0};
        this.state={items:[{readstat:[0,[1,0,1,0],0,1],bookname:"233",kind:"book"},{readstat:[1,1,1,1],bookname:"234",kind:"movie"},{readstat:[1,1,1,1],bookname:"234",kind:"movie"},{readstat:[1,1,1,1],bookname:"234",kind:"movie"}],value:0}
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }
    componentWillMount() {


    }
    componentDidMount() {
    }

    render() {
        var item=[];
        var items=this.state.items;
       for(var i=0;i<items.length;++i) {
            item.push(
                    <Grid item xs={6}>
                    <Paper>
                        <Grid container>
                            <Grid xs={1}>
                            </Grid>
                            <Grid xs={10}>
                                <h3>{items[i].bookname}</h3>
                                <Scheduletable readstat={items[i].readstat}></Scheduletable>
                            </Grid>
                            <Grid xs={1}>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>

            )
        }

        return(
            <div>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <Tabs  value={this.state.value} onChange={this.handleChange}>
                                <Tab label="全部"/>
                                <Tab label="书籍" />
                                <Tab label="视频" />

                            </Tabs>

                        </Grid>
                        <Grid item xs={12}>
                        <Grid container spacing={2}>
                        {item}
                        </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default Progressmanage;