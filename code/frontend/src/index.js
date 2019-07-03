import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Login from './component/login';
import App from './App';
import Userinfo from './component/userinfo';
import Scheduletable from './component/scheduletable';
import Tag from './component/tag';
import Item from './component/item';
import Listitem from './component/listitem'
import Navigation from './component/navigation'
import Browserlist from './component/browserlist'
import * as serviceWorker from './serviceWorker';
import Register from "./component/register";
import Topic from "./component/topic";
import TopicList from "./component/topiclist";


/*class Home extends Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = {"/"} component = {Home}/>
                    <Route path = {"/login"} component = {Login}/>
                    <Route path = {"/register"} component = {Register} />

                </Switch>
            </Router>
        )
    }
}*/

ReactDOM.render(<Scheduletable/>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
