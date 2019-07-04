import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }

    render() {
        return (
            <div className={useStyles.root}>
                <AppBar color={"default"} >
                    <Typography variant={"h4"} component={"h4"} >Bamdb</Typography>
                    <Tabs centered={true} value={this.state.value} onChange={this.handleChange}>
                        <LinkTab label="首页"/>
                        <LinkTab label="书籍"/>
                        <LinkTab label="讨论区"/>
                    </Tabs>
                    <InputBase
                        placeholder="Search…"
                        />
                </AppBar>
            </div>
        );
    }

}

export default Navigation;