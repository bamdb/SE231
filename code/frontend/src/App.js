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
import EntryPage from './entrypage'
import LoginPage from './loginpage'
import ItemInfoPage from './component/iteminfopage'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import UserPage from "./component/userpage";
import Login from "./component/login";
import RegisterPage from "./registerpage";
function App() {
  return (
    <div >

      <Router >
          <Route path={'/entrypage'} component={EntryPage}></Route>
          <Route path={'/loginpage'} component={LoginPage}></Route>
          <Route path={'/browserlist'} component={Browserlist}></Route>
          <Route path={'/topitemlist'} component={TopItemList}></Route>

          <Route path={'/search'} component={Search}></Route>
          <Route exact path={'/'} component={Homepage}></Route>
          <Route path={'/schedule'} component={Scheduletable}></Route>
          <Route path={'/item'} component={Item}></Route>
          <Route path={'/userinfo'} component={Userinfo}></Route>
          <Route path={'/userpage'} component={UserPage}></Route>
          <Route path={'/registerpage'} component={RegisterPage}></Route>
          <Route path={"/iteminfopage"} component={ItemInfoPage}></Route>
      </Router>
    </div>
  );
}

export default App;
