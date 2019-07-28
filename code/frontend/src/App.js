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
import Userinfopage from "./page/userinfopage";
import Useriteminfopage from "./page/useriteminfopage";
import Recommendpage from "./page/recommendpage";
import Activitypage from "./page/activitypage";
import Resetpwdpage from "./page/resetpwdpage";
import Messagepage from "./page/messagepage";
import leftappbar from "./component/leftappbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles/index';

import Adminpage from "./page/adminpage";
import Editorpage from './page/editorpage'
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

function App() {
    const classes=useStyles();
    const [needDrawer, setneedDrawer]=useState(true);
    const leftBar = needDrawer ? leftappbar() : <div />
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
                <Route path={'/itembrowse/flash'} component={Itembrowsepage}></Route>
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
                <Route path={'/recommend'} component={Recommendpage}></Route>
            </main>
        </div>
      </Router>
  );
}

export default App;
