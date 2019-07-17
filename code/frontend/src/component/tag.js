import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import '../css/tag.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { Divider } from 'antd';
import { Tag } from 'antd';

const { CheckableTag } = Tag;
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state={tags:[],select:false,selectedtags:[]};
        this.handletagchange=this.handletagchange.bind(this);
        this.handleclick=this.handleclick.bind(this);
    }

    handleclick(tag,checked) {
        const selectedTags = this.state.selectedtags;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedtags: nextSelectedTags });
        this.handletagchange();
    }

    handletagchange(){
        this.props.tagchange(this.state.selectedtags)
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
        const selectedTags = this.state.selectedtags;
        const rows=[];
        this.state.tags.map(tag => {
            rows.push(
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => this.handleclick(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            );
            rows.push(<Divider type="vertical" />);
        })
        if(rows.length >= 1) rows.pop();
        return(
            <div>
            {rows}
            </div>
        )
    }
    /*
        if(!this.state.select){
            var tags=this.state.tags;
            var item=[];

            for(var i=0;i<tags.length;++i) {
                item.push(
                    <CheckableTag label={tags[i]} clickable color="secondary" />
                );
                item.push(<Divider type={"vertical"}/> )
            }
            if(tags.length!==0) item.pop();
            return(

                <div>
                    {item}
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
                            <CheckableTag  id="chip" label={tags[i]} clickable onClick={this.handleclick} />
                    );
                    item.push(<Divider type={"vertical"}/>);
                }
                else
                {
                    item.push(
                            <CheckableTag onClick={this.handleclick}>tags[i]</
                    );
                    item.push(<Divider type={"vertical"} />);
                }
            }
            return(

                <div>
                    {item}
                </div>
            )

        }

    }

     */
}
export default Tags;
