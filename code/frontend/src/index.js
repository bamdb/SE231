import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Navigation from "./component/navigation";
import Collect from "./component/collect";
import Listitem from "./component/listitem";
import Browserlist from "./component/browserlist";
import Item from "./component/item";
import Comment from "./component/comment"
import Commentlist from "./component/commentlist";
import Discuss from "./component/discuss";

ReactDOM.render(<Discuss />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
