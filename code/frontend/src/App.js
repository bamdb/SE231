import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './component/search'
import Scheduletable from'./component/scheduletable'
import Item from './component/item'
import Userinfo from './component/userinfo'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
function App() {
  return (
    <div >

      <Router >

      <Route path={'/search'} component={Search}></Route>
      <Route path={'/schedule'} component={Scheduletable}></Route>
        <Route path={'/item'} component={Item}></Route>
        <Route path={'/userinfo'} component={Userinfo}></Route>

      </Router>
    </div>
  );
}

export default App;
