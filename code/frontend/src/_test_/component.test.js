import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { StaticRouter } from 'react-router'
import Tag from '../component/tag'
import Activity from '../component/activity'
import Activitylist from '../component/activitylist'
import Briefitemlist from '../component/briefitemlist'
import Browserlist from '../component/browserlist'
import Collect from '../component/collect'
import Collectform from '../component/collectform'
import Comment from '../component/comment'
import Commentlist from '../component/commentlist'
import Discuss from '../component/discuss'
import Item from '../component/item'
import Listitem from '../component/listitem'
import Login from '../component/login'
import Progressmanage from '../component/progressmanage'
import TestRenderer from 'react-test-renderer';
import Navigation from '../component/navigation'
import App from "../App";
import Register from "../component/register";
import Relateditem from "../component/relatedlist";
import Reply from "../component/reply";
import Scheduletable from "../component/scheduletable";
import Search from "../component/search";
import Topic from "../component/topic";
import TopicList from "../component/topiclist";
import TopItem from "../component/topitem";
import TopItemList from "../component/topitemlist";
import Userinfo from "../component/userinfo";
it('test tag', () => {
    const testrenderer=TestRenderer.create(<Tag/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test activity', () => {

    const testrenderer=TestRenderer.create(<StaticRouter><Activity/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
/*it('test navigation', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Navigation/></StaticRouter>);
    const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();
});*/
it('test activitylist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Activitylist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test briefitemlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Briefitemlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test browserlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Browserlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
/*it('test collect', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Collect/></StaticRouter>);
    const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();

});*/
it('test registry', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Register/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test collectform', () => {
    const testrenderer=TestRenderer.create(<Collectform/>);
  /*  const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test comment', () => {
    const testrenderer=TestRenderer.create(<Comment/>);
  /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test commentlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Commentlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test Discuss', () => {
    const testrenderer=TestRenderer.create(<Discuss/>);
  /*  const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test Item', () => {
    const testrenderer=TestRenderer.create(<Item/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test listitem', () => {
    const testrenderer=TestRenderer.create(<Listitem/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test login', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Login/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test progressmanage', () => {
    const testrenderer=TestRenderer.create(<Progressmanage/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test relateditem', () => {
    const testrenderer=TestRenderer.create(<Relateditem/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test reply', () => {
    const testrenderer=TestRenderer.create(<Reply/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test scheduletable', () => {
    const testrenderer=TestRenderer.create(<Scheduletable/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test search', () => {
    const testrenderer=TestRenderer.create(<Search/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test topic', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Topic/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test topiclist', () => {
    const testrenderer=TestRenderer.create(<TopicList/>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test topitem', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><TopItem/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test topitemlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><TopItemList/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('test userinfo', () => {
    const testrenderer=TestRenderer.create(<Userinfo/>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});





