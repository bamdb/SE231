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
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {blueGrey, grey, purple} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios'
import { Menu, Icon, Button, Divider } from 'antd';

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

 function LeftAppBar(props) {
    const classes = useStyles();
    const [open, setopen] = useState(true);
    const [openMess, setopenMess] =  useState(false);
    const [username,setusername]=useState("");
    const islogin = (localStorage.getItem("userid")!=null);
    const isUser = (localStorage.getItem("role")=='ROLE_USER');
    const isEditor = (localStorage.getItem("role")=='ROLE_EDITOR');
    var drawerbutton = open ? <ChevronLeftIcon />:<ChevronRightIcon />

    useEffect(() => {
        if(localStorage.getItem("username")!=null)
        {
            setusername(localStorage.getItem("username"))
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
            /*setusername(localStorage.getItem("username"))
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
            var url="http://202.120.40.8:30741/auth/username/"+localStorage.getItem("username");
            axios.get(url,{params:{access_token:localStorage.getItem("access_token")}}).then(
                function(res)
                {
                    localStorage.setItem("userid",res.data.id);
                }

            )
            axios.get("http://202.120.40.8:30741/auth/oauth/check_token",{params:{token:localStorage.getItem("access_token")}}).then(
                function(res)
                {
                    var auths=res.data.authorities;
                    var role="";
                    auths.map(auth=>{
                        if(role==""&&auth.indexOf("ROLE")!=-1)
                        {
                            role=auth;
                        }
                    })

                    localStorage.setItem("role",role)
                }
            )*/

        }

    });

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
                <div hidden={islogin}>
                <Link to={'/login'}>
                <IconButton
                    color={"inherit"}
                    edge="start">
                    <PersonOutlinedIcon />
                </IconButton>
                </Link>
                </div>
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
                <div hidden={!islogin}>
                <IconButton
                color={"inherit"}
                aria-label="Open drawer"
                edge="start"
                onClick={logout}>
                <Icon type="logout" />
            </IconButton>
                </div>
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
                    <ListItemText><Typography color={"textSecondary"}>我的主页</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/userinfo'}>
                    <ListItemIcon>
                        <FaceIcon  />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>个人中心</Typography></ListItemText>
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
                        <MovieOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>更多电影</Typography></ListItemText>
                </ListItem>
                <ListItem button component={Link} to={'/itembrowse/flash'}>
                <ListItemIcon>
                    <VideocanOutlinedIcon />
                </ListItemIcon>
                <ListItemText><Typography color={"textSecondary"}>更多动漫</Typography></ListItemText>
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
                <ListItem button component={Link} to={'/recommend'}>
                    <ListItemIcon>
                        <PaletteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>个性推荐</Typography></ListItemText>
                </ListItem>
                <div hidden={isUser} >
                <ListItem button component={Link} to={'/editor'} >
                    <ListItemIcon>
                        <BuildOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>编辑</Typography></ListItemText>
                </ListItem>
                </div>
                <div hidden={isUser||isEditor}>
                <ListItem button component={Link} to={'/admin'} >
                    <ListItemIcon>
                        <VpnKeyOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText><Typography color={"textSecondary"}>admin</Typography></ListItemText>
                </ListItem>
                </div>
                <br/><br/>
                <Divider />
                <br/><br/>
                <ListItem>
                    <Grid container justify="space-around" alignItems="center" spacing={2}>
                    <Avatar alt="暂无用户" src={"http://202.120.40.8:30741/image/id/"+localStorage.getItem("userid")+"0"} className={useStyles.avater}/>
                    <Typography color={"textSecondary"}>{username}</Typography>
                    </Grid>
                </ListItem>

                <br/><br/>
                <br/><br/>
                <br/><br/>
                <br/><br/>
                <Grid container justify="space-around" alignItems="center" spacing={2}>
                    <h3>Bamdb访客数</h3>
                </Grid>
                <Grid container justify="space-around" alignItems="center" spacing={2}>
                    <a href="https://www.easycounter.com/">
                        <img src="https://www.easycounter.com/counter.php?bamdb"
                             border="0" alt="Web Site Hit Counters"/>
                    </a>
                </Grid>

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
    )
}


class LeftBar extends Component {
    constructor(props){
        super(props);
        this.state={
            hidden: false,
            username:"尚未登录",
        }
    }

    toggleCollapsed = () => {
        this.props.toggleCollapesd();
    };

    componentDidMount() {
        if(localStorage.getItem("username")!=null) {
            this.setState({username:localStorage.getItem("username")})
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token");
        }
        else this.setState({username:"游客"})
    }

    render(){

        const isUser = (localStorage.getItem("role")=='ROLE_USER');
        const isEditor = (localStorage.getItem("role")=='ROLE_EDITOR');
        return(

                <Menu
                    mode="inline"
                >
                    <Button id={"togglebutton"} type={"link"} onClick={this.toggleCollapsed}  >
                        <Icon style={{fontSize:20}} type={this.props.collapsed ? 'right-circle' : "left-circle"} />
                    </Button>
                    <Menu.Item key="1">
                        <Link to={'/'}><Icon type="home" /><span>我的主页</span></Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/userinfo'}><Icon type="user" /><span>个人中心</span></Link>
                    </Menu.Item>

                    <Divider />

                    <Menu.Item key="3">
                        <Link to={'/itembrowse/book'}><Icon type="book" /><span>发现书籍</span></Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={'/itembrowse/movie'}><Icon type="video-camera" /><span>精选电影</span></Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={'/itembrowse/flash'}><Icon type="play-square" /><span>更多动漫</span></Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to={'/activity'}><Icon type="team" /><span>好友动态</span></Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to={'/topic'}><Icon type="coffee" /><span>讨论区</span></Link>
                    </Menu.Item>
                    <Menu.Item key="8" hidden={isUser}>
                        <Link to={'/editor'}><Icon type="edit" /><span>编辑</span></Link>
                    </Menu.Item>
                    <Menu.Item key="9" hidden={isUser||isEditor}>
                        <Link to={'/admin'}><Icon type="profile" /><span>管理中心</span></Link>
                    </Menu.Item>

                    <Divider/>
                    <div id={"leftbar-foot"}>
                    <Grid container justify="space-around" alignItems="center" spacing={2}>

                        <Avatar  src={"http://202.120.40.8:30741/image/id/"+localStorage.getItem("userid")+"0"} className={useStyles.avater}/>
                        <Typography hidden={this.props.collapsed} color={"textSecondary"}>{this.state.username}</Typography>

                    <Divider />
                    <div id={"leftbar-foot"} hidden={this.props.collapsed}>
                        <h3>Bamdb访客数</h3>
                        <a href="https://www.easycounter.com/">
                            <img src="https://www.easycounter.com/counter.php?bamdb"
                                 border="0" alt="Web Site Hit Counters"/>
                        </a>
                    </div>
                    </Grid> </div>
                </Menu>
        )
    }
}

export default LeftBar;