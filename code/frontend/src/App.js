import React, { useState, useEffect , Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserHomepage from './page/userhomepage'
import Itembrowsepage from './page/itembrowsepage'
import LoginPage from './page/loginpage'

import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import RegisterPage from "./page/registerpage";
import Topicpage from "./page/topicpage";
import Topicdetailpage from "./page/topicdetailpage";
import Userinfopage from "./page/userinfopage"
import Useriteminfopage from "./page/useriteminfopage"
import Activitypage from "./page/activitypage";
import Resetpwdpage from "./page/resetpwdpage";
import Messagepage from "./page/messagepage";
import Rating from "./component/rating";
import Collect from "./component/collect";
import Collectform from "./component/collectform";

import Addmessage from "./component/addmessage";
import Addtopic from "./component/addtopic";
import Edititem from "./component/edititem";
import Comment from './component/comment'
import Scheduletableold from './component/scheduletableold'
import leftappbar from "./component/leftappbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles/index';
import Leftappbarnew from "./component/leftappbarnew";
import Neweditor from "./page/editorpage";
import Adminpage from "./page/adminpage";
import Editorpage from './page/editorpage'
import axios from "axios";
import Itemmanagepage from "./page/itemmanage";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}))



function selectDrawer(isneeded) {
    if(!isneeded) var leftBar=<div/>;
    else var leftBar=leftappbar({username:"hyy"});
    console.log("login");
    return leftBar;
}
function App() {
    const classes=useStyles();
    const [needDrawer, setneedDrawer]=useState(true);
    const [username]=useState("");
    const leftBar = needDrawer ? leftappbar({username:"hyy"}) : <div />
    /*window.onunload=function(){
        localStorage.clear();
    }*/

  return (
      <Router >
        <div className={classes.root}>
            <CssBaseline />
            {leftBar}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path={'/topic'} component={Topicpage}></Route>
                <Route path={'/topicdetail/*'} component={Topicdetailpage}></Route>
                <Route path={'/itembrowse/movie'} component={Itembrowsepage}></Route>
                <Route path={'/itembrowse/book'} component={Itembrowsepage}></Route>
                <Route path={'/login'} component={LoginPage}></Route>
                <Route exact path={'/'} component={UserHomepage}></Route>
                <Route path={'/register'} component={RegisterPage}></Route>
                <Route path={'/itemdetail/*'} component={Useriteminfopage}></Route>
                <Route path={"/userinfo"} component={Userinfopage}></Route>
                <Route path={"/activity"} component={Activitypage}></Route>
                <Route path={'/resetpassword'} component={Resetpwdpage}></Route>
                <Route path={'/message'} component={Messagepage}></Route>
                <Route path={'/editor'} component={Editorpage}></Route>
                <Route path={'/admin'} component={Adminpage}></Route>
                <Route path={'/test'} component={Itemmanagepage}></Route>
            </main>
        </div>
      </Router>
  );
}

export default App;
