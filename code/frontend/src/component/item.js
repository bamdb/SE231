/*
 * 条目具体信息左栏
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import '../css/item.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Item extends Component {
    constructor(props) {
        super(props);
        this.state={name:"三体",date:"2000-1-1",author:"Liu Cixin",director:"",pages:"100",isbn:"123456"}
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    render() {
        return(

                <Paper style={{width:100}}>
                    <Grid container alignItems={"center"}>
                        <Grid item xs={12}>
                            <img src="img/3.jpg" id="itemimage" />
                        </Grid>
                        <Grid item xs={12}>
                        <List >
                            <ListItem>
                                <ListItemText primary="中文名" secondary={this.state.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="发行日期" secondary={this.state.date} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="作者" secondary={this.state.author} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="导演" secondary={this.state.director}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="页数" secondary={this.state.page}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="ISBN" secondary={this.state.isbn}></ListItemText>
                            </ListItem>
                        </List>
                        </Grid>
                    </Grid>
                </Paper>

        )
    }
}
export default Item;
