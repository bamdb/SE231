import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Userinfo from'./component/userinfo';
import Scheduletable from'./component/scheduletable';
import Tag from'./component/tag';
import Item from'./component/item';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Tag/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
