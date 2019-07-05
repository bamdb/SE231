import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserHomepage from './page/userhomepage'
import Itembrowsepage from './page/itembrowsepage'
import LoginPage from './page/loginpage'

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Userfavoritespage from "./page/userfavoritespage";
import RegisterPage from "./page/registerpage";
import Topicpage from "./page/topicpage";
import Topicdetailpage from "./page/topicdetailpage";
import Userinfopage from "./page/userinfopage"
import Useriteminfopage from "./page/useriteminfopage"
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
            <Route path={'/useriteminfopage'} component={Useriteminfopage}></Route>
            <Route path={"/userinfopage"} component={Userinfopage}></Route>
        </Router>
    </div>
  );
}

export default App;
