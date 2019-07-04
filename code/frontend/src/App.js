import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './component/search'
import Scheduletable from'./component/scheduletable'
import Item from './component/item'
import Userinfo from './component/userinfo'
import Homepage from './component/homepage'
import Navigation from "./component/navigation";
import TopItemList from "./component/topitemlist";
import Browserlist from "./component/browserlist";

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import UserPage from "./component/userpage";
function App() {
  return (
    <div >

      <Router >
        <Route path={'/browserlist'} component={Browserlist}></Route>
        <Route path={'/topitemlist'} component={TopItemList}></Route>
        <Route path={'/navigate'} component={Navigation}></Route>
      <Route path={'/search'} component={Search}></Route>
        <Route path={'/homepage'} component={Homepage}></Route>
      <Route path={'/schedule'} component={Scheduletable}></Route>
        <Route path={'/item'} component={Item}></Route>
          <Route path={'/userinfo'} component={Userinfo}></Route>
          <Route path={'/userpage'} component={UserPage}></Route>

      </Router>
    </div>
  );
}

export default App;
