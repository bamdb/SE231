import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './component/search'
import Scheduletable from'./component/scheduletable'
import Item from './component/item'
import Userinfo from './component/userinfo'
import UserHomepage from './page/userhomepage'
import Navigation from "./component/navigation";
import TopItemList from "./component/topitemlist";
import Browserlist from "./component/browserlist";
import Itembrowsepage from './page/itembrowsepage'
import LoginPage from './page/loginpage'
import Useriteminfopage from './page/useriteminfopage'
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

function App() {
  return (
    <div >
        <Router >
            <Route path={'/topicpage'}> component={Topicpage}></Route>
            <Route path={'/entrypage'} component={Itembrowsepage}></Route>
            <Route path={'/loginpage'} component={LoginPage}></Route>
            <Route exact path={'/'} component={UserHomepage}></Route>
            <Route path={'/userpage'} component={Userfavoritespage}></Route>
            <Route path={'/registerpage'} component={RegisterPage}></Route>
            <Route path={'/iteminfopage'} component={Useriteminfopage}></Route>
        </Router>
    </div>
  );
}

export default App;
