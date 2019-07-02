import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Listitem from "./listitem";
import Comment from "./comment";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
}));

class Commentlist extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List className={useStyles.root}>
                <ListItem>
                    <Comment
                     username = {"abc"}
                     date = {"2000-1-1"}
                     grade = {8}
                     comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                     "gingacross all continents except Antarctica"}
                    />
                </ListItem>
                <ListItem>
                    <Comment
                        username = {"abc"}
                        date = {"2000-1-1"}
                        grade = {8}
                        comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                        "gingacross all continents except Antarctica"}
                    />
                </ListItem>
                <ListItem>
                    <Comment
                        username = {"abc"}
                        date = {"2000-1-1"}
                        grade = {8}
                        comment = {"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ran" +
                        "gingacross all continents except Antarctica"}
                    />
                </ListItem>
            </List>
        );
    }
}

export default Commentlist;