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
        this.state={tags:["搞笑","热血","王道"],select:false,currenttags:[]};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleclick=this.handleclick.bind(this);
    }

    handleclick(e){
        var tags=this.state.currenttags;
        console.log(tags);
        console.log(e.target.innerText)

        for(var i=0;i<tags.length;++i)
        {
            if(e.target.innerText==tags[i])
            {
                tags.splice(i,1);
                this.setState({currenttags:tags})

                return;
            }
        }
        tags.push(e.target.innerText);

        this.setState({currenttags:tags})
        this.handletagchange();

        return;
    }
    handletagchange(){
        this.props.tagchange(this.state.currenttags)
    }
    componentWillMount() {
        if(this.props.tags!=null)
        {
            this.setState({tags:this.props.tags})
        }
        if(this.props.select!=false){
            this.setState({select:this.props.select})
        }

    }
    componentDidMount() {
    }

    render() {

        if(!this.state.select){
            var tags=this.state.tags;
            var item=[];

            for(var i=0;i<tags.length;++i) {
                item.push(
                    <Grid item xs={'auto'}>
                        <Chip  id="chip" label={tags[i]} clickable color="secondary" />
                    </Grid>
                );
            }
            return(

                <div>
                    <Paper id={"tagmain"}>
                        <Grid container spacing={2} >
                            {item}
                        </Grid>
                    </Paper>
                </div>
            )
        }
        else{
            var tags=this.state.tags;
            var item=[];
            var currenttags=this.state.currenttags;
            for(var i=0;i<tags.length;++i) {
                var flag=false;
                for(var j=0;j<currenttags.length;++j)
                {
                    if(currenttags[j]==tags[i])
                    {
                        flag=true;
                        break;
                    }
                }
                if(!flag)
                {
                    item.push(
                        <Grid item xs={'auto'}>
                            <Chip  id="chip" label={tags[i]} clickable onClick={this.handleclick} />
                        </Grid>
                    );
                }
                else
                {
                    item.push(
                        <Grid item xs={'auto'}>
                            <Chip  id="chip" label={tags[i]} clickable color="secondary" onClick={this.handleclick}/>
                        </Grid>
                    );
                }

            }
            return(

                <div>
                    <Paper id={"tagmain"}>
                        <Grid container spacing={2} >
                            {item}
                        </Grid>
                    </Paper>
                </div>
            )

        }

    }
}
export default Tag;
