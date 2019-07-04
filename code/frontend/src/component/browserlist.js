/*
 * 条目列表
 * 包含对条目的介绍和是否收藏
 *
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Listitem from "./listitem";
import '../css/browserlist.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 600,
        backgroundColor: theme.palette.background.paper,
    },
}));

class Browserlist extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item=[];
        for(var i=0;i<10;++i){
            item.push(
                <div id={"list"}>
                    <Listitem
                        name={"a"}
                        date={"a"}
                        author={"a"}
                        score={"a"}
                        rank={"a"}
                        chapter={"a"}
                    />
                </div>
            )

        }

        return(
        /*<List className={useStyles.root}>
            <ListItem id={"li"}>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>
            <ListItem id={"li"}>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>
            <ListItem id={"li"}>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>

        </List>*/
        <div>
            {item}
        </div>
        );
    }
}

export default Browserlist;