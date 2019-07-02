import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Login from './login';
import * as serviceWorker from './serviceWorker';
import Register from "./register";


class Home extends Component{
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
}

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
