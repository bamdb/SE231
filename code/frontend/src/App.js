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
import Chart from "./component/test";
import Addmessage from "./component/addmessage";
import Addtopic from "./component/addtopic";
import Editorpage from "./page/editorpage";
import Comment from './component/comment'
import Scheduletableold from './component/scheduletableold'
import Dashboard from "./component/test1";
function App() {
  return (
    <div >
        <Router >
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
            <Route path={"/test"} component={Comment}></Route>

        </Router>
    </div>
  );
}

export default App;
