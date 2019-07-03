import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Userinfo from './component/userinfo';
import Scheduletable from './component/scheduletable';
import Tag from './component/tag';
import Item from './component/item';
import Listitem from './component/listitem'
import Navigation from './component/navigation'
import Browserlist from './component/browserlist'
import * as serviceWorker from './serviceWorker';
import Reply from "./component/reply";
import Relateditem from "./component/relatedlist";
import Activity from "./component/activity"
import Activitylist from "./component/activitylist";
import Register from "./component/register";
import Topic from "./component/topic";
import TopicList from "./component/topiclist";
import TopItemList from './component/topitemlist';

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

ReactDOM.render(<TopItemList/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
