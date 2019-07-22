import React, { useState, useEffect , Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Messagepage from '../page/messagepage'
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography';
import AppBar from  '@material-ui/core/AppBar';
import Toolbar from  '@material-ui/core/Toolbar';
import TextsmsIcon from '@material-ui/icons/Textsms';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined'
import FaceIcon from '@material-ui/icons/Face';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import VideocanOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import MessageIcon from '@material-ui/icons/Message';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import { Icon } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {blueGrey, grey, purple} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios'
const drawerWidth=240;

const theme = createMuiTheme({
})
const useStyles = makeStyles(theme=>({
    avatar:{
        margin: 10,
        width: 100,
        height: 100,
    },
    drawerPaper: {
        position: 'relative',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
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
    avater: {
        margin:10,
        width: 80,
        height: 80,
    },
    list: {
        width:300,
    }
}))

export default function LeftAppBar(props) {
    const classes = useStyles();
    const [open, setopen] = useState(true);
    const [openMess, setopenMess] =  useState(false);
    const [username,setusername]=useState("");
    var drawerbutton = open ? <ChevronLeftIcon />:<ChevronRightIcon />
    useEffect(() => {


        if(localStorage.getItem("username")!=null)
        {
            setusername(localStorage.getItem("username"))
            var url="http://202.120.40.8:30741/auth/username/"+localStorage.getItem("username");
            axios.get(url,{params:{access_token:localStorage.getItem("access_token")}}).then(
                function(res)
                {
                    localStorage.setItem("userid",res.data.id);
                }

            )

        }

    });

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
    function logout()
    {
        localStorage.clear();
        window.location.reload();
    }

    function handleMessOpen() {
        setopenMess(true);
    }

    function handleMessClose() {
        setopenMess(false);
    }

    return(
        <div>
            <ThemeProvider theme={theme}>
        <AppBar
            color={"primary"}
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
                <Link to={'/login'}>
                <IconButton
                    color={"inherit"}
                    aria-label="Open drawer"
                    edge="start">
                    <PersonOutlinedIcon />
                </IconButton>
                </Link>
                <Link to={'/'}>
                <IconButton
                    color={"inherit"}
                    aria-label="Open drawer"
                    edge="start">
                    <EmailIcon />
                </IconButton>
                </Link>
                <IconButton
                    color={"inherit"}
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleMessOpen}
                >
                    <MessageIcon />
                </IconButton>
                <IconButton
                color={"inherit"}
                aria-label="Open drawer"
                edge="start"
                onClick={logout}>
                <Icon type="logout" />
            </IconButton>
            </div>
            </div>
        </AppBar>
            </ThemeProvider>
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
                <ListItem button  component={Link} to={'/userinfo'}>
                    <ListItemIcon>
                        <MovieOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}> MOVIE</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/userinfo'}>
                    <ListItemIcon>
                        <BookOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>BOOK</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/userinfo'}>
                    <ListItemIcon>
                        <FaceIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>Me</Typography></ListItemText>
                </ListItem>
                <br/><br/><br/>
                <Divider />
                <br/><br/><br/>
                <ListItem button component={Link} to={'/itembrowse/book'}>
                    <ListItemIcon>
                        <GraphicEqIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>发现书籍</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/itembrowse/movie'}>
                    <ListItemIcon>
                        <VideocanOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>更多电影</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/activity'}>
                    <ListItemIcon>
                        <PersonOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>好友动态</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/topic'}>
                    <ListItemIcon>
                        <TextsmsIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>讨论区</Typography></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PaletteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>个性推荐</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/editor'}>
                    <ListItemIcon>
                        <BuildOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>编辑</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/admin'}>
                    <ListItemIcon>
                        <VpnKeyOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>admin</Typography></ListItemText>
                </ListItem>
                <br/><br/>
                <Divider />
                <br/><br/>
                <ListItem>
                    <Grid container justify="space-around" alignItems="center" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/img/3.jpg" className={useStyles.avater}/>
                    <Typography color={"textSecondary"}>{username}</Typography>
                    </Grid>
                </ListItem>

                <br/><br/>
            </div>

        </Drawer>
            <Drawer
                anchor={"right"}
                open={openMess}
                onClose={handleMessClose}
            >

                <div className={classes.list}>
                <Messagepage />
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
