import React from 'react';



import { StaticRouter } from 'react-router'
import Tag from './component/tag'
import Activity from './component/activity'
import Activitylist from './component/activitylist'
import Briefitemlist from './component/briefitemlist'
import Browserlist from './component/browserlist'
import Collect from './component/collect'
import Collectform from './component/collectform'
import Comment from './component/comment'
import Commentlist from './component/commentlist'
import Discuss from './component/discuss'
import Item from './component/item'
import Listitem from './component/listitem'
import Login from './component/login'
import Progressmanage from './component/progressmanage'
import TestRenderer from 'react-test-renderer';
import Navigation from './component/navigation'
import App from "./App";
import Register from "./component/register";
import Relateditem from "./component/relatedlist";
import Reply from "./component/reply";
import Scheduletable from "./component/scheduletable";
import Search from "./component/search";
import Topic from "./component/topic";
import TopicList from "./component/topiclist";
import TopItem from "./component/topitem";
import TopItemList from "./component/topitemlist";
import Userinfo from "./component/userinfo";
import Messagelist from './component/messagelist';
import Pagetable from './component/pagetable';

it('_test_ activity', () => {

    const testrenderer=TestRenderer.create(<StaticRouter><Activity date={"2019-T123"}/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
/*it('_test_ navigation', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Navigation/></StaticRouter>);
    const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();
});*/
it('_test_ activitylist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Activitylist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ briefitemlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Briefitemlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ browserlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Browserlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
/*it('_test_ collect', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Collect/></StaticRouter>);
    const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();

});*/
it('_test_ registry', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Register/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ collectform', () => {
    const testrenderer=TestRenderer.create(<Collectform/>);
  /*  const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ comment', () => {
    const testrenderer=TestRenderer.create(<Comment/>);
  /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ commentlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Commentlist/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ Discuss', () => {
    const testrenderer=TestRenderer.create(<Discuss/>);
  /*  const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ Item', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Item/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ listitem', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Listitem/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ login', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Login/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ messagelist',()=>{
    const testrenderer=TestRenderer.create(<Messagelist/>);
})
it('_test_ pagetable',()=>{
    const testrenderer=TestRenderer.create(<StaticRouter><Pagetable/></StaticRouter>);
})
it('_test_ progressmanage', () => {
    const testrenderer=TestRenderer.create(<Progressmanage/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ relateditem', () => {
    const testrenderer=TestRenderer.create(<Relateditem/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ reply', () => {
    const testrenderer=TestRenderer.create(<Reply/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ scheduletable', () => {
    const testrenderer=TestRenderer.create(<Scheduletable imgurl={"http://15615"}/>);
    const testrenderer1=TestRenderer.create(<Scheduletable imgurl={"http://15615"} readstat={[0,[1,0,1,0],0,1]}/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ search', () => {
    const testrenderer=TestRenderer.create(<Search/>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ tag',()=>{
    const testrenderer=TestRenderer.create(<StaticRouter><Tag/></StaticRouter>);
    const testrenderer1=TestRenderer.create(<StaticRouter><Tag select={true}/></StaticRouter>);
})
it('_test_ topic', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><Topic/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ topiclist', () => {
    const testrenderer=TestRenderer.create(<TopicList/>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ topitem', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><TopItem/></StaticRouter>);
   /* const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ topitemlist', () => {
    const testrenderer=TestRenderer.create(<StaticRouter><TopItemList/></StaticRouter>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});
it('_test_ userinfo', () => {
    const testrenderer=TestRenderer.create(<Userinfo/>);
    /*const testinstance=testrenderer.root;
    let tree = testrenderer.toJSON();
    expect(tree).toMatchSnapshot();*/
});





