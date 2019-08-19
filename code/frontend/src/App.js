import React, { useState, useEffect , Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserHomepage from './page/userhomepage'
import Itembrowsepage from './page/itembrowsepage'
import LoginPage from './page/loginpage'
import {
  BrowserRouter as Router,
  Route,
  Switch,
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
import LeftBar from "./component/leftappbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles/index';

import Adminpage from "./page/adminpage";
import Editorpage from './page/editorpage'
import Itemmanagepage from "./page/itemmanage";
import Errorpage from "./page/404errorpage";
import {Layout} from 'antd';
import Head from "./component/header";
import Searchpage from "./page/searchpage";
import Chatpage from "./page/chatpage";


const { Header, Content, Footer, Sider } = Layout;


class App extends Component{
    constructor(props){
        super(props);
        this.state={
            collapsed:false,
            hidden:false,
            page404:false
        }
        this.onCollapse=this.onCollapse.bind(this);
    }
    onCollapse() {
        this.setState({collapsed:!this.state.collapsed})
    }

    componentWillMount() {
        if(window.location.href.split('/')[3]==='/404') {
            this.setState({page404: true});
        }
    }
    render() {
        const hidden=this.state.hidden;
        if(this.state.page404)
        return (
            <Errorpage />
        )

            return (
          <Router>
              <Layout style={{minHeight: '100vh'}}>
                  <Sider collapsed={this.state.collapsed} id={"sider"} hidden={hidden}>
                      <LeftBar collapsed={this.state.collapsed} toggleCollapesd={this.onCollapse} />
                  </Sider>
                  <Layout>
                      <Header id={"header"}>
                      <Head />
                      </Header>
                      <Content style={{margin: '16px'}}>
                          <div id={"content"}>
                              <Switch>
                                  <Route path={'/topic'} component={Topicpage}></Route>
                                  <Route path={'/topicdetail/*'} component={Topicdetailpage}></Route>
                                  <Route path={'/itembrowse/*'} component={Itembrowsepage}></Route>
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
                                  <Route path={'/search/*'} component={Searchpage}></Route>
                                  <Route path={'/chatroom'} component={Chatpage}></Route>
                              </Switch>
                          </div>
                      </Content>
                  </Layout>
              </Layout>
          </Router>
      )
  }
}

export default App;
