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

export default function LeftAppBar(props) {
    const classes = useStyles();
    const [open, setopen] = React.useState(true);
    var drawerbutton = open ? <ChevronLeftIcon />:<ChevronRightIcon />
    /*
    constructor(props){
        super(props);
        this.state={
            username:"shenruien",
            password:"123456",
            email:"123456@qq.com",
            id:"1",
            date:"2019-7-1",
            grade:"1",
            open: true,
        };
        this.handleDrawerClose=this.handleDrawerClose.bind(this);
    }

     */

    function handleDrawerClose(){
        setopen(false);
    }

    function handleDrawerOpen(){
        setopen(true);
    }

    return(
        <div>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <div className={classes.toolbar} >
            <IconButton
                onClick={handleDrawerOpen}
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.theme} color={"inherit"}>
                Bamdb
            </Typography>

            <div className={classes.toolbarIcon} >
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
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon} >
                <IconButton onClick={handleDrawerClose}>
                    {drawerbutton}
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
                <ListItem  button component={Link} to={'/activity'}>
                    <ListItemIcon>
                        <MovieOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText >activity</ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/message'}>
                    <ListItemIcon>
                        <BookOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText>message</ListItemText>
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
                <ListItem button component={Link} to={'/itembrowse'}>
                    <ListItemIcon>
                        <PersonOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText>browse</ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/topic'}>
                    <ListItemIcon>
                        <PersonOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText>topic</ListItemText>
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
    /*
            <Grid container spacing={2} direction={"column"} justify={"flex-start"} wrap={"nowrap"} >
                <br/>
                <br/>
                <Grid item style={{paddingLeft:80}}>
                    <Grid container >
                        <Grid item xs={3} >
                            <HomeOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.main}}>HOME</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{paddingLeft:80}}>
                    <Grid container >
                        <Grid item xs={3}>
                            <MovieOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.main}}>MOVIE</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft:80}}>
                    <Grid container >
                        <Grid item xs={3}>
                            <BookOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.main}}>BOOK</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft:80}}>
                    <Grid container >
                        <Grid item xs={3}>
                            <PersonOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.main}}>HELP</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft:60}}>
                    <Grid container >
                        <Grid item xs={3}>
                            <GraphicEqIcon className={useStyles.icon} style={{color:theme.palette.secondary.dark}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.dark}}>--------------</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <br/><br/>
                <Grid item style={{paddingLeft:80}}>
                    <Grid container >
                        <Grid item xs={3}>
                            <PersonOutlinedIcon className={useStyles.icon} style={{color:theme.palette.secondary.main}} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{color:theme.palette.secondary.main}}>HELP</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            <Grid container spacing={2}  direction={"row"} >
                <Grid item xs={3}  >
                <Avatar src="..\img.jpg" className={useStyles.avatar} />
                </Grid>
                <Grid item  >
                    <Typography variant={"subtitle1"} style={{color:theme.palette.secondary.main}} >{this.state.username}</Typography>
                </Grid>
            </Grid>
        </Drawer>
    </MuiThemeProvider>

     */
    )
}
