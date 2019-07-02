import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Listitem from "./listitem";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
}));

class Browserlist extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <List className={useStyles.root}>
            <ListItem>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>
            <ListItem>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>
            <ListItem>
                <Listitem
                    name={"a"}
                    date={"a"}
                    author={"a"}
                    score={"a"}
                    rank={"a"}
                    chapter={"a"}
                />
            </ListItem>
        </List>
        );
    }
}

export default Browserlist;