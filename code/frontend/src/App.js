import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserHomepage from './page/userhomepage'
import Itembrowsepage from './page/itembrowsepage'
import LoginPage from './page/loginpage'

import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Userfavoritespage from "./page/userfavoritespage";
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
import Editorpage from "./page/editorpage";
import Comment from './component/comment'
import Scheduletableold from './component/scheduletableold'
import leftappbar from "./component/leftappbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles/index';



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
        padding: theme.spacing(3),
    },
}))

function App() {
    const [needDrawer, setneedDrawer]=React.useState(true);
    const leftBar = needDrawer ? leftappbar() : <div />
    const classes=useStyles();
  return (
      <Router >
        <div className={classes.root}>
            <CssBaseline />
            {leftBar}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path={'/topic'} component={Topicpage}></Route>
                <Route path={'/topicdetail/*'} component={Topicdetailpage}></Route>
                <Route path={'/itembrowse'} component={Itembrowsepage}></Route>
                <Route path={'/login'} component={LoginPage}></Route>
                <Route exact path={'/'} component={UserHomepage}></Route>
                <Route path={'/userfavoritepage'} component={Userfavoritespage}></Route>
                <Route path={'/register'} component={RegisterPage}></Route>
                <Route path={'/itemdetail/*'} component={Useriteminfopage}></Route>
                <Route path={"/userinfo"} component={Userinfopage}></Route>
                <Route path={"/activity"} component={Activitypage}></Route>
                <Route path={'/resetpassword'} component={Resetpwdpage}></Route>
                <Route path={'/message'} component={Messagepage}></Route>
            </main>
        </div>
      </Router>
  );
}

export default App;
