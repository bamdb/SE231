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

ReactDOM.render(<Relateditem/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
