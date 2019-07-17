import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography';
import AppBar from  '@material-ui/core/AppBar';
import Toolbar from  '@material-ui/core/Toolbar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import MessageIcon from '@material-ui/icons/Message';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {blueGrey} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { StaticRouter } from 'react-router'
const drawerWidth=240;
const color = blueGrey[50];

const useStyles = makeStyles(theme=>({
    avatar:{
        margin: 10,
        width: 100,
        height: 100,
    },
    drawerPaper: {
        position:'relative',
        height:"100%",
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {

        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
    },
    appBar: {
        height:48,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    Iconbutton: {
        paddingLeft: 50,
    },
}))

class Leftappbarnew extends Component{
    constructor(props)
    {
        super(props)
        this.state={open:true}
        this.handleDrawerClose=this.handleDrawerClose.bind(this);
        this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
    }




   handleDrawerClose(){

    }

    handleDrawerOpen(){

    }
    render()
    {
        return(
            <StaticRouter>
            <div>
                <AppBar>
                    <div  >
                        <IconButton

                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap  color={"inherit"}>
                            Bamdb
                        </Typography>

                        <div  >
                            <IconButton color="inherit"
                                        aria-label="Open drawer"
                                        edge="start">
                                <EmailIcon />
                            </IconButton>
                            <IconButton color="inherit"
                                        aria-label="Open drawer"
                                        edge="start">
                                <PersonOutlinedIcon />
                            </IconButton>
                            <IconButton color="inherit"
                                        aria-label="Open drawer"
                                        edge="start">
                                <MessageIcon />
                            </IconButton>
                        </div>
                    </div>
                </AppBar>
                <Drawer
                    variant="permanent"

                    open={this.state.open}
                >
                    <div  >
                        <IconButton >

                        </IconButton>
                    </div>
                    <Divider />
                    <div>
                        <ListItem button component={Link} to={'/'}>
                            <ListItemIcon>
                                <HomeOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText><Typography color={"textSecondary"}> HOME</Typography></ListItemText>
                        </ListItem>
                        <ListItem  component={Link} to={'/userfavoritepage'}>
                            <ListItemIcon>
                                <MovieOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText component={Link} to={'/activity'}>activity</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <BookOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>BOOK</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>HELP</ListItemText>
                        </ListItem>
                        <br/><br/><br/>
                        <Divider />
                        <br/><br/><br/>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>Comment</ListItemText>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>Comment</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>？？？</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>动态</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>浏览</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonOutlinedIcon  />
                            </ListItemIcon>
                            <ListItemText>讨论区</ListItemText>
                        </ListItem>

                    </div>

                </Drawer>

            </div>
            </StaticRouter>
        )
    }



}
export default Leftappbarnew