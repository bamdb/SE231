import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import '../css/tag.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid'


/*
 信息保存在state中，可以自行添加props或ajax
*/

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state={tags:["搞笑","热血","王道"]};
    }
    componentWillMount() {
        if(this.props.tags!=null)
        {
            this.setState({tags:this.props.tags})
        }

    }
    componentDidMount() {
    }

    render() {
        var tags=this.state.tags;
        var item=[];

        for(var i=0;i<tags.length;++i) {
            item.push(
                <Grid item xs={'auto'}>
                <Chip  id="chip" label={tags[i]} clickable color="primary" />
                </Grid>
            );
        }

        return(
            <div>
                <Paper id={"tagmain"}>
                    <Grid container  >
                    {item}
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default Tag;
