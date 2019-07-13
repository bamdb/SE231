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
function App() {
  return (
    <div >
        <Router >
            <Route path={'/topicpage'} component={Topicpage}></Route>
            <Route path={'/topicdetailpage'} component={Topicdetailpage}></Route>
            <Route path={'/itembrowsepage'} component={Itembrowsepage}></Route>
            <Route path={'/loginpage'} component={LoginPage}></Route>
            <Route exact path={'/'} component={UserHomepage}></Route>
            <Route path={'/userfavoritepage'} component={Userfavoritespage}></Route>
            <Route path={'/registerpage'} component={RegisterPage}></Route>
            <Route path={'/useriteminfopage/*'} component={Useriteminfopage}></Route>
            <Route path={"/userinfopage"} component={Userinfopage}></Route>
            <Route path={"/activitypage"} component={Activitypage}></Route>
            <Route path={'/resetpassword'} component={Resetpwdpage}></Route>
            <Route path={'/messagepage'} component={Messagepage}></Route>
            <Route path={"/test"} component={Addtopic}></Route>

        </Router>
    </div>
  );
}

export default App;
